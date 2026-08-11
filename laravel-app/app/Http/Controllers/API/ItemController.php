<?php

namespace App\Http\Controllers\API;
use App\Models\GameItem;
use App\Http\Controllers\Controller;
use App\Http\Requests\Item\ItemRequest;
use App\Http\Resources\Item\ItemResource;
use Illuminate\Http\Request;
use App\Services\CloudinaryService;

class ItemController extends Controller
{
     public function __construct(
        private CloudinaryService $cloudinary
     ){}
    function index(Request $request){
        $query = GameItem::with('images');
        if($request->has('status')){
            $query->where('status',$request->status);
        }
        if($request->filled("search")){
            $query->where('desc','like','%'.$request->search.'%');
        }
        $items = $query->latest()->get();
        return response([
            'message'=>'All items retrieved successfully',
            'items' => ItemResource::collection($items)
        ],200);
    }
   public function store(ItemRequest $request)
    {
        $item = GameItem::create($request->validated());
        if ($request->has('images')) {
            $this->syncImages($item, $request->images);
        }
        return response([
            'message' => 'Item created successfully',
            'item' => new ItemResource($item)
        ], 201);
    }
   public function update(ItemRequest $request, $id)
    {
        $item = GameItem::with('images')->find($id);
        if (!$item) {
            return response(['message' => 'Item not found!'], 404);
        }
        $item->update($request->validated());
        if ($request->has('images')) {
            $this->syncImages($item, $request->images);
        }
        return response([
            'message' => 'Item updated successfully',
            'item' => new ItemResource($item)
        ], 200);
    }
   public function destroy($id)
   {
    $item = GameItem::with('images')->find($id);
    if (!$item) {
        return response(['message' => 'Item not found!'], 404);
    }
    foreach ($item->images as $image) {
        if ($image->public_id) {
                $this->cloudinary->deleteImage($image->public_id);
        }
    }
    $item->images()->delete();
    $item->delete();
    return response(['message' => 'Item deleted successfully'], 200);
     }
    function show($id){
        $item = GameItem::with('images')->find($id);
        if(!$item){
            return response(['message'=>'Item not found!.'],404);
        }
        return response([
            'message'=>'Successfully retrieved',
            'item'=> new ItemResource($item)
        ],200);
    }
    private function syncImages(GameItem $item, array $incomingImages): void
    {
        $existingPublicIds = $item->images()->pluck('public_id')->toArray();
        $incomingPublicIds = array_column($incomingImages, 'public_id');
        $toDeletePublicIds = array_diff($existingPublicIds, $incomingPublicIds);
        if (!empty($toDeletePublicIds)) {
            foreach ($toDeletePublicIds as $publicId) {
                try {
                   $this->cloudinary->deleteImage($publicId);
                } catch (\Exception $e) {
                    logger("Cloudinary Delete Error: " . $e->getMessage());
                }
            }
            $item->images()->whereIn('public_id', $toDeletePublicIds)->delete();
        }
        foreach ($incomingImages as $image) {
            if (!in_array($image['public_id'], $existingPublicIds)) {
                [$finalPublicId, $finalUrl] = $this->cloudinary->processTempImage($image['public_id'], $image['url']);
                $item->images()->create([
                    'public_id' => $finalPublicId,
                    'url'       => $finalUrl,
                ]);
            }
        }
    }
}
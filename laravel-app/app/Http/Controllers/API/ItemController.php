<?php

namespace App\Http\Controllers\API;
use App\Models\GameItem;
use App\Http\Controllers\Controller;
use App\Http\Requests\Item\StoreRequest;
use App\Http\Resources\Item\ItemResource;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary;

class ItemController extends Controller
{
    private $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key'    => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
            'url' => [
                'secure' => true
            ]
        ]);
    }
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


   public function store(StoreRequest $request)
    {
       $data = $request->only(['status', 'desc', 'price']);
       $item = GameItem::updateOrCreate(
         ['id' => $request->id], 
        $data                 
       );
        $message = $request->filled('id') ? 'Item updated successfully.' : 'Item created successfully.';
      if ($request->has('images') && is_array($request->images)) {
            $this->syncImages($item, $request->images);
       }
        return response([
            'message' => $message,
            'item' => new ItemResource($item->load('images')),
        ], $request->filled('id') ? 200 : 201);
    }


   public function destroy($id)
   {
    $item = GameItem::with('images')->find($id);
    if (!$item) {
        return response(['message' => 'Item not found!'], 404);
    }
    foreach ($item->images as $image) {
        if ($image->public_id) {
            try {
                $this->cloudinary->uploadApi()->destroy($image->public_id);
            } catch (\Exception $e) {
                logger("Cloudinary Delete Error on Destroy: " . $e->getMessage());
            }
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
                    $this->cloudinary->uploadApi()->destroy($publicId);
                } catch (\Exception $e) {
                    logger("Cloudinary Delete Error: " . $e->getMessage());
                }
            }
            $item->images()->whereIn('public_id', $toDeletePublicIds)->delete();
        }
        foreach ($incomingImages as $image) {
            if (!in_array($image['public_id'], $existingPublicIds)) {
                [$finalPublicId, $finalUrl] = $this->processCloudinaryImage($image['public_id'], $image['url']);

                $item->images()->create([
                    'public_id' => $finalPublicId,
                    'url'       => $finalUrl,
                ]);
            }
        }
    }

    
    function processCloudinaryImage(string $publicId, string $url): array
    {
    if (!str_starts_with($publicId, 'temp/')) {
        return [$publicId, $url];
    }
    $fileName = basename($publicId);
    $finalPublicId = 'game_items/' . $fileName;
    $finalUrl = str_replace('temp/', 'game_items/', $url);
    try {
        $this->cloudinary->uploadApi()->rename($publicId, $finalPublicId);
    } catch (\Exception $e) {
        logger("Cloudinary Rename Error: " . $e->getMessage());
    }
    return [$finalPublicId, $finalUrl];
   }
}
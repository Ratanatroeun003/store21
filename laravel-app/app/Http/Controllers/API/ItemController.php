<?php

namespace App\Http\Controllers\API;
use App\Models\GameItem;
use App\Http\Controllers\Controller;
use App\Http\Requests\Item\StoreRequest;
use App\Http\Resources\Item\ItemResource;
use Illuminate\Http\Request;

class ItemController extends Controller
{
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
        $item = null;
        $message = '';
        if ($request->filled('id')) {
            $item = GameItem::find($request->id);
            
            if (!$item) {
                return response(['message' => 'Item not found for update!'], 404);
            }
            $item->update([
                'status' => $request->status,
                'desc' => $request->desc,
                'price' => $request->price,
            ]);
            $message = 'Item updated successfully.';
        } else {
            $item = GameItem::create([
                'status' => $request->status,
                'desc' => $request->desc,
                'price' => $request->price,
            ]);
            $message = 'Item created successfully.';
        }
        if ($request->has('images') && is_array($request->images)) {
            $item->images()->delete();
            foreach ($request->images as $image) {
                $item->images()->create([
                    'url' => $image['url'],
                    'public_id'=>$image['public_id']
                ]);
            }
        }
        return response([
            'message' => $message,
            'item' => new ItemResource($item->load('images')),
        ], $request->filled('id') ? 200 : 201);
    }
    function destroy($id){
        $item = GameItem::find($id);
        if (!$item){
            return response(['message'=>'Item not found!'],404);
        }
        $item->images()->delete();
        $item->delete();
        return response(['message'=>'Item deleted'],200);
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
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
#[Fillable(['public_id','url'])]
class GameItemImage extends Model
{
 function item(){
    return $this->belongsTo(GameItem::class,'game_item_id');
 }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
#[Fillable(['desc','price','status'])]

class GameItem extends Model
{
   function images(){
      return  $this-> hasMany(GameItemImage::class,'game_item_id');
   }
}

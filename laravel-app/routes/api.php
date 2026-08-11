<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/signup',[AuthController::class,'signup']);
Route::post('/signin',[AuthController::class,'signin']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/signout',[AuthController::class,'signout']);
    Route::get('/verify',[AuthController::class,'verify']);
});
Route::prefix('items')->group(function(){
     Route::get('/',[ItemController::class,'index']);
     Route::get('/{id}',[ItemController::class,'show']);
     Route::middleware('auth:sanctum','is_admin')->group(function(){
        Route::post('/',[ItemController::class,'store']);
        Route::put('/{id}',[ItemController::class,'update']);
        Route::delete('/{id}',[ItemController::class,'destroy']);
     });
});

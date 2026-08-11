<?php
namespace App\Services;
use Cloudinary\Cloudinary;
class CloudinaryService
{
   protected Cloudinary $cloudinary;
    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud'=>[
                'cloud_name'=> config('services.cloudinary.cloud_name'),
                'api_key'=>config('services.cloudinary.api_key'),
                'api_secret'=>config('services.cloudinary.api_secret')
            ],
            'url'=>[
                'secure'=>true
            ],
        ]);
    }
    public function deleteImage(string $publicId): void
    {
        try {
            $this->cloudinary->uploadApi()->destroy($publicId);
        } catch (\Throwable $e) {
            logger("Cloudinary Delete Error: " . $e->getMessage());
        }
    }
    public function processTempImage(string $publicId, string $url, string $targetFolder = 'game_items'): array
    {
        if (!str_starts_with($publicId, 'temp/')) {
            return [$publicId, $url];
        }
        $fileName = basename($publicId);
        $finalPublicId = "{$targetFolder}/{$fileName}";
        try {
            $response = $this->cloudinary->uploadApi()->rename($publicId, $finalPublicId);
            logger()->info('Cloudinary Rename Response', [
            'response' => $response
           ]);      
            $finalUrl = $response['secure_url'] ?? str_replace('temp/', "{$targetFolder}/", $url);
            return [$finalPublicId, $finalUrl];
        } catch (\Throwable $e) {
            logger("Cloudinary Rename Error: " . $e->getMessage());
            return [$publicId, $url];
        }
    }
}

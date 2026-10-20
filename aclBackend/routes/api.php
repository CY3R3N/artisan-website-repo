<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SiteSectionController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\CatalogRequestController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UpcomingEventController;
use App\Http\Controllers\Api\NewsArticleController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\JobOpeningController;
use App\Http\Controllers\Api\ContactInquiryController;

// Health / Status check
Route::get('/ping', function () {
    return response()->json([
        'status' => 'online',
        'service' => 'Artisan Ceramics Limited API',
        'database' => config('database.default'),
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Admin Authentication
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);

// Dashboard stats
Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

// Dynamic Site Sections (Hero video, Profile journey, Chairman message, Popup, Contact info)
Route::get('/sections', [SiteSectionController::class, 'index']);
Route::get('/sections/{key}', [SiteSectionController::class, 'show']);
Route::post('/sections/{key}', [SiteSectionController::class, 'update']);

// Catalogs
Route::apiResource('catalogs', CatalogController::class);

// Catalog Requests
Route::apiResource('catalog-requests', CatalogRequestController::class);

// Products
Route::get('/admin/products', [ProductController::class, 'allAdmin']);
Route::apiResource('products', ProductController::class);

// Upcoming Events
Route::apiResource('events', UpcomingEventController::class);

// News & Articles
Route::apiResource('news', NewsArticleController::class);

// Leadership & Team
Route::get('/admin/team', [TeamMemberController::class, 'allAdmin']);
Route::apiResource('team', TeamMemberController::class);

// Careers & Jobs
Route::get('/admin/jobs', [JobOpeningController::class, 'allAdmin']);
Route::apiResource('jobs', JobOpeningController::class);

// Contact Inquiries
Route::apiResource('inquiries', ContactInquiryController::class);

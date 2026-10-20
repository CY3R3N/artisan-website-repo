<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Catalog;
use App\Models\CatalogRequest;
use App\Models\Product;
use App\Models\NewsArticle;
use App\Models\UpcomingEvent;
use App\Models\JobOpening;
use App\Models\ContactInquiry;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'catalogs_count' => Catalog::count(),
            'catalog_requests_pending' => CatalogRequest::where('status', 'pending')->count(),
            'catalog_requests_total' => CatalogRequest::count(),
            'products_count' => Product::count(),
            'news_count' => NewsArticle::count(),
            'events_count' => UpcomingEvent::count(),
            'jobs_count' => JobOpening::count(),
            'team_count' => TeamMember::count(),
            'inquiries_new' => ContactInquiry::where('status', 'new')->count(),
            'inquiries_total' => ContactInquiry::count(),
            'recent_catalog_requests' => CatalogRequest::orderBy('id', 'desc')->take(5)->get(),
            'recent_inquiries' => ContactInquiry::orderBy('id', 'desc')->take(5)->get(),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SiteSectionController extends Controller
{
    public function index()
    {
        $sections = SiteSection::all()->keyBy('key');
        return response()->json($sections);
    }

    public function show($key)
    {
        $section = SiteSection::where('key', $key)->first();
        if (!$section) {
            return response()->json(['message' => 'Section not found'], 404);
        }
        return response()->json($section);
    }

    public function update(Request $request, $key)
    {
        $section = SiteSection::firstOrNew(['key' => $key]);

        if ($request->has('title')) {
            $section->title = $request->input('title');
        }
        if ($request->has('subtitle')) {
            $section->subtitle = $request->input('subtitle');
        }
        if ($request->has('tagline')) {
            $section->tagline = $request->input('tagline');
        }
        if ($request->has('content')) {
            $section->content = $request->input('content');
        }
        if ($request->has('data')) {
            $data = $request->input('data');
            $section->data = is_string($data) ? json_decode($data, true) : $data;
        }

        // Handle primary media file upload (video or image)
        if ($request->hasFile('media')) {
            if ($section->media_path && Storage::disk('public')->exists($section->media_path)) {
                Storage::disk('public')->delete($section->media_path);
            }
            $path = $request->file('media')->store('sections', 'public');
            $section->media_path = $path;
        }

        // Handle thumbnail upload
        if ($request->hasFile('thumb')) {
            if ($section->thumb_path && Storage::disk('public')->exists($section->thumb_path)) {
                Storage::disk('public')->delete($section->thumb_path);
            }
            $thumbPath = $request->file('thumb')->store('sections/thumbs', 'public');
            $section->thumb_path = $thumbPath;
        }

        $section->save();

        return response()->json([
            'message' => 'Section updated successfully',
            'section' => $section,
            'media_url' => $section->media_path ? asset('storage/' . $section->media_path) : null,
            'thumb_url' => $section->thumb_path ? asset('storage/' . $section->thumb_path) : null,
        ]);
    }
}

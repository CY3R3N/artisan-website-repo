<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UpcomingEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UpcomingEventController extends Controller
{
    public function index()
    {
        $events = UpcomingEvent::orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($ev) {
                return [
                    ...$ev->toArray(),
                    'image_url' => $ev->image_path ? asset('storage/' . $ev->image_path) : null,
                ];
            });

        return response()->json($events);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'date_text' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'stand_no' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'nullable|boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
        }

        $event = UpcomingEvent::create([
            'title' => $validated['title'],
            'category' => $validated['category'] ?? 'Our Upcoming Event',
            'description' => $validated['description'] ?? null,
            'date_text' => $validated['date_text'] ?? null,
            'location' => $validated['location'] ?? null,
            'stand_no' => $validated['stand_no'] ?? null,
            'image_path' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => UpcomingEvent::count(),
        ]);

        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event,
            'image_url' => $imagePath ? asset('storage/' . $imagePath) : null,
        ], 201);
    }

    public function update(Request $request, UpcomingEvent $upcomingEvent)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'date_text' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'stand_no' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($upcomingEvent->image_path && Storage::disk('public')->exists($upcomingEvent->image_path)) {
                Storage::disk('public')->delete($upcomingEvent->image_path);
            }
            $upcomingEvent->image_path = $request->file('image')->store('events', 'public');
        }

        if ($request->has('title')) $upcomingEvent->title = $validated['title'];
        if ($request->has('category')) $upcomingEvent->category = $validated['category'];
        if ($request->has('description')) $upcomingEvent->description = $validated['description'];
        if ($request->has('date_text')) $upcomingEvent->date_text = $validated['date_text'];
        if ($request->has('location')) $upcomingEvent->location = $validated['location'];
        if ($request->has('stand_no')) $upcomingEvent->stand_no = $validated['stand_no'];
        if ($request->has('is_active')) $upcomingEvent->is_active = $request->boolean('is_active');

        $upcomingEvent->save();

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $upcomingEvent,
            'image_url' => $upcomingEvent->image_path ? asset('storage/' . $upcomingEvent->image_path) : null,
        ]);
    }

    public function destroy(UpcomingEvent $upcomingEvent)
    {
        if ($upcomingEvent->image_path && Storage::disk('public')->exists($upcomingEvent->image_path)) {
            Storage::disk('public')->delete($upcomingEvent->image_path);
        }
        $upcomingEvent->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}

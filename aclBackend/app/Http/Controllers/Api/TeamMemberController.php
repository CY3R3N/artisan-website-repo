<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamMemberController extends Controller
{
    public function index(Request $request)
    {
        $query = TeamMember::where('is_active', true);
        if ($request->filled('group')) {
            $query->where('group', $request->query('group'));
        }

        $members = $query->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($m) {
                return [
                    ...$m->toArray(),
                    'image_url' => $m->image_path ? asset('storage/' . $m->image_path) : null,
                ];
            });

        return response()->json($members);
    }

    public function allAdmin()
    {
        $members = TeamMember::orderBy('group', 'asc')
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($m) {
                return [
                    ...$m->toArray(),
                    'image_url' => $m->image_path ? asset('storage/' . $m->image_path) : null,
                ];
            });

        return response()->json($members);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'group' => 'required|in:director,executive,management',
            'bio' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'nullable|boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('team', 'public');
        }

        $member = TeamMember::create([
            'name' => $validated['name'],
            'designation' => $validated['designation'],
            'group' => $validated['group'],
            'bio' => $validated['bio'] ?? null,
            'image_path' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => TeamMember::where('group', $validated['group'])->count(),
        ]);

        return response()->json([
            'message' => 'Team member added successfully',
            'member' => $member,
            'image_url' => $imagePath ? asset('storage/' . $imagePath) : null,
        ], 201);
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'designation' => 'sometimes|required|string|max:255',
            'group' => 'sometimes|required|in:director,executive,management',
            'bio' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($teamMember->image_path && Storage::disk('public')->exists($teamMember->image_path)) {
                Storage::disk('public')->delete($teamMember->image_path);
            }
            $teamMember->image_path = $request->file('image')->store('team', 'public');
        }

        if ($request->has('name')) $teamMember->name = $validated['name'];
        if ($request->has('designation')) $teamMember->designation = $validated['designation'];
        if ($request->has('group')) $teamMember->group = $validated['group'];
        if ($request->has('bio')) $teamMember->bio = $validated['bio'];
        if ($request->has('is_active')) $teamMember->is_active = $request->boolean('is_active');

        $teamMember->save();

        return response()->json([
            'message' => 'Team member updated successfully',
            'member' => $teamMember,
            'image_url' => $teamMember->image_path ? asset('storage/' . $teamMember->image_path) : null,
        ]);
    }

    public function destroy(TeamMember $teamMember)
    {
        if ($teamMember->image_path && Storage::disk('public')->exists($teamMember->image_path)) {
            Storage::disk('public')->delete($teamMember->image_path);
        }
        $teamMember->delete();

        return response()->json(['message' => 'Team member deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;

class ContactInquiryController extends Controller
{
    public function index()
    {
        $inquiries = ContactInquiry::orderBy('id', 'desc')->get();
        return response()->json($inquiries);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'department' => 'nullable|string|max:100',
            'message' => 'required|string|min:5',
        ]);

        $inquiry = ContactInquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'department' => $validated['department'] ?? 'General',
            'message' => $validated['message'],
            'status' => 'new',
        ]);

        return response()->json([
            'message' => 'Your message has been sent successfully',
            'inquiry' => $inquiry,
        ], 201);
    }

    public function update(Request $request, ContactInquiry $contactInquiry)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,read,replied',
        ]);

        $contactInquiry->update($validated);

        return response()->json([
            'message' => 'Inquiry status updated',
            'inquiry' => $contactInquiry,
        ]);
    }

    public function destroy(ContactInquiry $contactInquiry)
    {
        $contactInquiry->delete();
        return response()->json(['message' => 'Inquiry deleted successfully']);
    }
}

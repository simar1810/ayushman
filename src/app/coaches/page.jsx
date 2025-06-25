"use client";
import PageHeader from "@/components/globals/core/PageHeader";
import Faqs from "@/components/globals/home-page/Faqs";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/api";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const ITEMS_PER_PAGE = 20;

export default function Page() {
  const [coaches, setCoaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    async function getCoaches() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });

        if (selectedState) {
          params.append("state", selectedState);
        }
        if (selectedCity) {
          params.append("city", selectedCity);
        }

        const response = await fetchData(
          `app/all-coaches?${params.toString()}`
        );
        if (response.success) {
          setCoaches(response.data);
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error("Error fetching coaches:", error);
        setCoaches([]);
        setPagination({
          total: 0,
          pages: 0,
          page: 1,
          limit: ITEMS_PER_PAGE,
        });
      } finally {
        setLoading(false);
      }
    }
    getCoaches();
  }, [page, selectedState, selectedCity]);

  const filteredCoaches = coaches.filter((coach) =>
    coach.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCoachClick = (coachId) => {
    window.location.href = `http://localhost:3001/${coachId}`;
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setPage(1);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <main className="bg-white">
      <PageHeader
        title="Coaches"
        description="Find experienced coaches in your area"
      />

      {/* Filters */}
      <div className="bg-gradient-to-r from-[#F6F6F6] to-[#E8F5E8] py-8 px-4 md:px-10 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Search Coach
              </label>
              <input
                type="text"
                placeholder="Search by coach name..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="px-4 py-3 w-full rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6DB20D] focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="px-4 py-3 w-full rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6DB20D] focus:border-transparent transition-all"
              >
                <option value="">All States</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                placeholder="Enter city name..."
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="px-4 py-3 w-full rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6DB20D] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            {loading ? (
              <span>Loading coaches...</span>
            ) : (
              <span>
                Showing {filteredCoaches.length} of {pagination.total} coaches
                {selectedState && ` in ${selectedState}`}
                {selectedCity && ` • ${selectedCity}`}
                {searchTerm && ` • matching "${searchTerm}"`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Coach Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6DB20D] mx-auto mb-4"></div>
              <p className="text-gray-500">Loading coaches...</p>
            </div>
          </div>
        ) : filteredCoaches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No coaches found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or browse all coaches.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("");
                setSelectedState("");
                setPage(1);
              }}
              className="bg-[#6DB20D] hover:bg-[#5a9c0b] text-white px-6 py-2 rounded-full transition-all"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCoaches.map((coach) => (
              <div
                onClick={() => handleCoachClick(coach.coachId)}
                key={coach._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={coach.profilePhoto || "/api/placeholder/300/220"}
                    alt={coach.name}
                    className="h-[220px] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#6DB20D] transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {coach.specialization || "Fitness & Wellness Coach"}
                    </p>

                    {(coach.city || coach.state) && (
                      <p className="text-xs text-gray-500 mb-2">
                        📍{" "}
                        {[coach.city, coach.state].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0" />
                      <span>{coach.totalClients || 0} Consults completed</span>
                    </div>

                    {coach.experience && (
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="w-4 h-4 text-blue-500 mr-1">⭐</span>
                        <span>{coach.experience} years experience</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && filteredCoaches.length > 0 && pagination.pages > 1 && (
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing page {pagination.page} of {pagination.pages}(
                {pagination.total} total coaches)
              </div>

              <div className="flex items-center gap-2">
                <Button
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                  variant="outline"
                  className="px-3 py-2 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </Button>

                <Button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  variant="outline"
                  className="px-4 py-2 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, pagination.pages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.pages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= pagination.pages - 2) {
                        pageNum = pagination.pages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          variant={page === pageNum ? "default" : "outline"}
                          className={`w-10 h-10 text-sm ${
                            page === pageNum
                              ? "bg-[#6DB20D] hover:bg-[#5a9c0b] text-white"
                              : ""
                          }`}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                  )}
                </div>

                <Button
                  disabled={page === pagination.pages}
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, pagination.pages))
                  }
                  variant="outline"
                  className="px-4 py-2 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </Button>

                <Button
                  disabled={page === pagination.pages}
                  onClick={() => setPage(pagination.pages)}
                  variant="outline"
                  className="px-3 py-2 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Faqs />
    </main>
  );
}

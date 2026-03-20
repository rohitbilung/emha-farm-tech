// components/ProductSkeleton.jsx
export default function ProductSkeleton() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 animate-pulse">
      {/* Image box */}
      <div className="h-48 w-full bg-stone-200 rounded-xl mb-4" />
      {/* Category line */}
      <div className="h-3 w-20 bg-stone-200 rounded mb-2" />
      {/* Title line */}
      <div className="h-5 w-3/4 bg-stone-200 rounded mb-2" />
      {/* Price line */}
      <div className="h-4 w-1/4 bg-stone-200 rounded" />
    </div>
  );
}
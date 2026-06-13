import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 md:mt-16 max-w-xxl w-full mx-auto px-8">
      <div className="flex flex-col md:flex-row items-center py-4 justify-between gap-4 md:gap-8">
        <div className=" text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CarBazar. All rights reserved.
        </div>
        <Link
          href="/cars"
          className="text-secondary hover:text-primary font-semibold text-sm "
        >
          Cars
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Connect:</span>

          <Link href="#" className="hover:text-blue-600 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14.1 6h2.4v3h-2.4c-.7 0-1.1.4-1.1 1.1V12H17l-.5 3h-2.5v7A10 10 0 0 0 22 12z" />
            </svg>
          </Link>

          <Link href="#" className="hover:text-black transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.1L6.6 22H2l7.3-8.4L1 2h6.3l4.4 5.5L18.9 2zm-1.1 18h1.7L7.1 4H5.3l12.5 16z" />
            </svg>
          </Link>

          <Link href="#" className="hover:text-red-600 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
            </svg>
          </Link>

          <Link href="#" className="hover:text-pink-500 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
            </svg>
          </Link>

          <Link href="#" className="hover:text-blue-700 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1A4.2 4.2 0 0 1 18.5 9c3 0 5.5 2 5.5 6v6h-4v-5.5c0-2-1-3.5-3-3.5s-3 1.5-3 3.5V21h-4V9z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}

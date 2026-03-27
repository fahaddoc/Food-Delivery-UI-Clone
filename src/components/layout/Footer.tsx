'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#ff6b35] rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🍽️</span>
              </div>
              <span className="font-bold text-xl">Foodie</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your favorite food, delivered fast. Order from the best local restaurants with easy, on-demand delivery.
            </p>
            <div className="flex gap-3">
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#ff6b35] rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="text-sm">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Press'].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#ff6b35] transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Safety', 'Terms of Service', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#ff6b35] transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get the App</h3>
            <p className="text-gray-400 text-sm mb-4">
              Download for exclusive offers and easy ordering.
            </p>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on</div>
                  <div className="font-medium">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                <span className="text-2xl">▶️</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="font-medium">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Foodie. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">We accept:</span>
            <div className="flex gap-2">
              {['💳', '🔵', '🟡', '🍎'].map((icon, i) => (
                <span key={i} className="text-xl">{icon}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

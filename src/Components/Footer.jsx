import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaWallet } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 1. Website Info (Logo & Name) */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FaWallet className="text-3xl text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                FinEase
              </span>
            </Link>
            <p className="text-sm">
              Take control of your finances. Simple, insightful, and secure.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h5 className="text-sm font-semibold uppercase text-gray-800 dark:text-gray-200 tracking-wider mb-4">
              Quick Links
            </h5>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/add-transaction"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Add Transaction
              </Link>
              <Link
                to="/my-transaction"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                My Transactions
              </Link>
              <Link
                to="/reports"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Reports
              </Link>
              <Link
                to="/profile"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Profile
              </Link>
            </nav>
          </div>

          {/* 3. Legal */}
          <div>
            <h5 className="text-sm font-semibold uppercase text-gray-800 dark:text-gray-200 tracking-wider mb-4">
              Legal
            </h5>
            <nav className="flex flex-col space-y-2">
              <Link
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* 4. Contact Details */}
          <div>
            <h5 className="text-sm font-semibold uppercase text-gray-800 dark:text-gray-200 tracking-wider mb-4">
              Contact Us
            </h5>
            <address className="not-italic flex flex-col space-y-2">
              <a
                href="mailto:support@finease.com"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                support@finease.com
              </a>
              <a
                href="tel:+880123456789"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                (+880) 123-456-789
              </a>
            </address>
          </div>
        </div>

        {/* --- Bottom Bar (Copyright & Socials) --- */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} FinEase. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaFacebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaInstagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaXTwitter size={20} />
              <span className="sr-only">X (Twitter)</span>
            </Link>
            <Link
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaGithub size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

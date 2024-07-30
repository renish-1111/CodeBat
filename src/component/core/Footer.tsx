

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-2">About Codebat</h4>
              <p className="text-gray-400">
                Codebat is your one-stop destination for coding tutorials, latest trends, tips, and insights in the world of coding.
              </p>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="list-none">
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-gray-200">Home</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-gray-200">Blog</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-gray-200">Tutorials</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-gray-200">Contact</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
              <p className="text-gray-400">
                Email: contact@codebat.com
              </p>
              <p className="text-gray-400">
                Phone: +123 456 7890
              </p>
              <div className="mt-4 flex">
                <a href="#" className="text-gray-400 hover:text-gray-200 mr-4">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.41 3.66 8.06 8.31 8.94v-6.33h-2.5v-2.6h2.5v-1.96c0-2.45 1.48-3.8 3.71-3.8 1.07 0 2.18.19 2.18.19v2.42h-1.23c-1.22 0-1.6.76-1.6 1.54v1.82h2.75l-.44 2.6h-2.31v6.33c4.65-.88 8.31-4.53 8.31-8.94 0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-200 mr-4">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.61.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.82.5-1.74.86-2.71 1.05a4.27 4.27 0 0 0-7.29 3.89c-3.55-.18-6.73-1.88-8.85-4.48-.37.62-.58 1.35-.58 2.13 0 1.47.75 2.77 1.88 3.53-.7-.02-1.36-.21-1.94-.53v.05c0 2.05 1.46 3.76 3.41 4.14-.36.1-.73.15-1.12.15-.27 0-.54-.02-.8-.07.55 1.73 2.16 2.98 4.06 3.02a8.57 8.57 0 0 1-5.29 1.83c-.34 0-.67-.02-1-.06a12.07 12.07 0 0 0 6.52 1.91c7.83 0 12.1-6.48 12.1-12.1 0-.18-.01-.37-.01-.55.83-.6 1.54-1.34 2.1-2.18z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-200">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M16.59 8.58c-.42-.42-.99-.65-1.59-.65-.6 0-1.17.23-1.59.65l-1.54 1.54-1.54-1.54c-.42-.42-.99-.65-1.59-.65-.6 0-1.17.23-1.59.65-.42.42-.65.99-.65 1.59 0 .6.23 1.17.65 1.59l1.54 1.54-1.54 1.54c-.42.42-.65.99-.65 1.59 0 .6.23 1.17.65 1.59.42.42.99.65 1.59.65.6 0 1.17-.23 1.59-.65l1.54-1.54 1.54 1.54c.42.42.99.65 1.59.65.6 0 1.17-.23 1.59-.65.42-.42.65-.99.65-1.59 0-.6-.23-1.17-.65-1.59l-1.54-1.54 1.54-1.54c.42-.42.65-.99.65-1.59 0-.6-.23-1.17-.65-1.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          &copy; 2024 Codebat. All rights reserved.
        </div>
      </footer>
    </>
  )
}

export default Footer

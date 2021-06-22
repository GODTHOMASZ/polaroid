/* eslint-disable jsx-a11y/anchor-is-valid */


export default function Footer() {
  return (
    <footer className="footer bg-white static pt-1 border-b-2 border-gray-base">
      <div className="container mx-auto px-6">
        <div className="sm:flex sm:mt-6">
            <div className="mt-4 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                <div className="flex flex-col">
                    <span className="my-1"><a href="#" className="text-gray-base  text-md hover:text-gray-base">Информация</a></span>
                </div>
                <div className="flex flex-col">
                    <span className="my-1"><a href="#" className="text-gray-base text-md hover:text-gray-base">Помощь</a></span>
                </div>
                <div className="flex flex-col">
                    <span className="my-1"><a href="#" className="text-gray-base  text-md hover:text-gray-base">Условия</a></span>
                </div>
            </div>
        </div>
        </div>
        <div className="container mx-auto px-6">
        <div className="mt-6 border-t-2 border-gray-base flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
                <p className="text-sm text-gray-base font-bold mb-2">
                  POLAROID ОТ GODTHOMASZ, 2021
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
}

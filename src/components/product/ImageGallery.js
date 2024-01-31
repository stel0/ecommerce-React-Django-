import { Tab } from "@headlessui/react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ImageGallery({ data }) {
  return (
    <>
      <Tab.Group as="div" className="flex flex-col-reverse">
        {/* Image selector */}
        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            <Tab
              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
            >
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <img
                  src={data}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </span>
              
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
            <Tab.Panel>
              <img
                src={data}
                alt=""
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default ImageGallery;

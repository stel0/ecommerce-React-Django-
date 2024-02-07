import {
  SortAscendingIcon,
  UsersIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { Fragment } from "react";

export default function SearchBar({ onChange, onSubmit, categories }) {
  return (
    <form onSubmit={e=>onSubmit(e)}className="mt-1 flex rounded-md shadow-md">
      <select
        onChange={(e) => onChange(e)}
        name="category_id"
        className="rounded-full"
      >
        <option value={0} name="category_id">
          All
        </option>
        {categories &&
          categories !== null &&
          categories !== undefined &&
          categories.map((category, index) => (
            <Fragment>
              <option key={index} value={category.id}>
                {category.name}
              </option>
              {category.sub_categories &&
                category.sub_categories.map((sub_category, index) => (
                  <option key={index} value={sub_category.id}>
                    {sub_category.name}
                  </option>
                ))}
            </Fragment>
          ))}
      </select>
      <input
        type="search"
        name="search"
        onChange={(e) => onChange(e)}
        required
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300"
        placeholder="Buscador"
      />
      <button
        type="submit"
        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span>
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </button>
    </form>
  );
}

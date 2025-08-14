import Papa, { ParseError } from "papaparse";
import Slideshow from "@/components/Slideshow";

interface MenuItem {
  [key: string]: string;
}

async function getMenuData(): Promise<MenuItem[]> {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/adriens/auptitcafe-data/refs/heads/main/data/current_menus_headers.csv",
      { cache: "no-store" } // Disable caching to get live data
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as MenuItem[]);
        },
        error: (error: ParseError) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing menu data:", error);
    return []; // Return empty array on error
  }
}

export default async function Home() {
  const menuItems = await getMenuData();

  if (menuItems.length === 0) {
    return (
      <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-2xl">Could not load menu. Please try again later.</p>
      </div>
    );
  }

  return <Slideshow items={menuItems} />;
}

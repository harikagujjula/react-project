/**
  This is a replica of SRCButton.jsx but using Tailwing CSS instead of styled 
 components. Update the import accordingly. 

 * Note that to demo the usage of Tailwind css we are using it with a component 
  here for ease instead of getting rid of whole projects css. However old styles
  might get disturbed. Follow the https://tailwindcss.com/docs/guides/vite to 
  incorporate it with a project and update the tailwind.cinfig.js accordingly.
*/
import "./SRCButtonWithTailWind.css";

export default function SRCButtonWithTailWind({children, ...props}) {
  return (
    <button className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-amber-400" {...props}>{children}</button>
  );
}
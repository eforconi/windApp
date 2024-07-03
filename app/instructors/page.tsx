import Link from "next/link";
import { Instructor } from "../lib/definitions";
import styles from './instructor.module.css';
import CreateInstructor from "./CreateInstructor";

async function getInstructors() {
    const response = await fetch('http://127.0.0.1:8090/api/collections/instructors/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await response.json();
    return await data?.items as Instructor[];
}

export default async function Instructors() {
    const instructors = await getInstructors();
  return (
    <div>
      <h1>Instructors</h1>
        <div className="w-screen">
            {instructors?.map((instructor:Instructor,index:number) => {
                return (<Instructor key={instructor.id} index={index}{...instructor}  />);
            })}
    <CreateInstructor />    
        </div>
    </div>
  );

    function Instructor({ index, id, name, discipline, price_per_hour }: Instructor & {index:number}) {
        const image: string = index + '.jpeg';
        return (
            <div className="border-black bg-white">
                <Link href={`/instructors/${id}`}>
                    <div className="flex font-sans w-fit">
                    <div className="flex-none w-40 relative">
                        <img src={image} alt="Instructor" className="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
                    </div>
                    <form className="flex-auto p-6">
                        <div className="flex flex-wrap">
                        <h1 className="flex-auto w-full font-medium text-slate-900">
                            {name}
                        </h1>
                        <div className="text-sm w-full font-medium text-slate-400">
                            {discipline}
                        </div>
                        <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
                            ${price_per_hour}
                        </div>
                        </div>
                        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        {/* <div className="space-x-2 flex text-sm font-bold">
                            <label>
                            <input className="sr-only peer" name="size" type="radio" value="xs" checked />
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                                XS
                            </div>
                            </label>
                            <label>
                            <input className="sr-only peer" name="size" type="radio" value="s" />
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                                S
                            </div>
                            </label>
                            <label>
                            <input className="sr-only peer" name="size" type="radio" value="m" />
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                                M
                            </div>
                            </label>
                            <label>
                            <input className="sr-only peer" name="size" type="radio" value="l" />
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                                L
                            </div>
                            </label>
                            <label>
                            <input className="sr-only peer" name="size" type="radio" value="xl" />
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                                XL
                            </div>
                            </label>
                        </div> */}
                        </div>
                        <div className="flex space-x-4 mb-5 text-sm font-medium">
                        <div className="flex-auto flex space-x-4">
                            <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white" type="submit">
                            Contact now
                            </button>
                            {/* <button className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900" type="button">
                            Add to bag
                            </button> */}
                        </div>
                        <button className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50" type="button" aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </button>
                        </div>
                    </form>
                    </div>
                </Link>
            </div>
        );

    }
}
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
        <div className="flex flex-col h-screen">
            <header className="p-4 bg-gray-800 text-white">Header</header>
            <main className="flex-grow flex items-center justify-center">
                <div className="container mx-auto p-4 h-3/5 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mb-4">Instructors</h1>
                    <div className="flex flex-wrap -mx-4">
                        {instructors?.map((instructor: Instructor, index: number) => {
                            return (<Instructor key={instructor.id} index={index} {...instructor} />);
                        })}
                        {/* <CreateInstructor /> */}
                    </div>
                </div>
            </main>
            <footer className="p-4 bg-gray-800 text-white">Footer</footer>
        </div>
  );

    function Instructor({ index, id, name, discipline, price_per_hour }: Instructor & {index:number}) {
        const image: string = index + '.jpeg';
        return (
            <div className="w-1/2 lg:w-1/3 p-4 h-1/6">
                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <Link href={`/instructors/${id}`}>
                        <div className="block h-1/6">
                            <div className="relative">
                                <img src={image} alt={`Instructor ${index}`} className="w-full object-scale-down" loading="lazy" />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold">{name}</h2>
                                <p className="text-sm text-gray-600">{discipline}</p>
                                <div className="mt-2 text-xl font-semibold text-violet-600">${price_per_hour}/hr</div>
                                <button className="w-full text-sm h-10 px-6 font-semibold rounded-full bg-violet-600 text-white" type="button">
                                    Contact now
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );

    }
}
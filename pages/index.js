import { useRouter } from "next/dist/client/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-green-400">
      <Head>
        <title>FAID</title>
        <link rel="icon" href="/heart.svg" />
      </Head>
      <p className="text-6xl font-thin">FAID</p>
      <img
        src="/heart.svg"
        alt="Heart Icon"
        className="h-40 ml-2 rounded-full my-12"
      />
      <button
        // type="submit"
        onClick={() => router.push("/what_happened")}
        class="inline-flex bg-red-500 justify-center w-36 py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Emergency
      </button>
    </div>
  );
}

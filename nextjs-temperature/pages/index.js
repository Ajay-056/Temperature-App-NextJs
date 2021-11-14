import Head from 'next/head';
import { useState, useEffect } from 'react';
import { converter, fetchQuery, getUniqueTemp } from '../utils/helper';

export default function Home({ temperatures }) {
  const [answer, setAnswer] = useState('');
  const [from, setFrom] = useState('C');
  const [to, setTo] = useState('F');
  const [temperature, setTemperature] = useState(1);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(getUniqueTemp(temperatures, 'from'));
  }, [temperatures]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswer(
      `${converter(temperatures, from, to, Number(temperature))} ${to}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Temperature Converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-12">
          Temperature <span className="text-red-600">Converter</span>
        </h1>
        <form className="space-y-4 text-gray-700" onSubmit={handleSubmit}>
          <div className="flex flex-wrap"></div>
          <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
            <div className="w-full px-2 md:w-1/2">
              <div className="flex items-center">
                <label className="bg-black flex items-center justify-center rounded-l-lg text-white font-bold p-1 px-3 h-10">
                  From
                </label>
                <select
                  className="w-full h-10 pl-3 rounded-r-lg pr-6 text-base placeholder-gray-600 border appearance-none focus:shadow-outline"
                  placeholder="Select From"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                >
                  {options.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full px-2 md:w-1/2">
              <div className="flex items-center">
                <label className="bg-black flex items-center justify-center rounded-l-lg text-white font-bold p-1 px-5 h-10">
                  To
                </label>
                <select
                  className="w-full h-10 pl-3 pr-6 text-base border rounded-r-lg placeholder-gray-600 outline-none appearance-none focus:shadow-outline"
                  placeholder="Select To"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                >
                  {options.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
            <div className="w-full px-2 md:w-1/2">
              <div className="flex items-center">
                <label className="bg-black flex items-center justify-center rounded-l-lg text-white font-bold p-1 px-3 h-10">
                  Value
                </label>
                <input
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-r-lg focus:shadow-outline"
                  type="number"
                  value={temperature}
                  onChange={(e) => {
                    setTemperature(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full px-2 md:w-1/2">
              <input
                className="w-full h-10 px-3 my-9 cursor-pointer text-base placeholder-gray-600 border rounded-lg focus:shadow-outline hover:bg-blue-600 hover:text-white"
                type="submit"
                value="Convert"
              />
            </div>
          </div>
        </form>
        <div>Result is : {answer}</div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const temperatures = await fetchQuery('temperatures');
  return {
    props: {
      temperatures,
    },
  };
}


import { useState } from 'react';
const axios = require('axios');


export default function Home() {

  function colorizeTashkeel(string: any, oneColor="") {
    let result="",colorTable = ['red','blue','green','DarkOrange','aqua','magenta','BlueViolet','Brown']; // 8 colors for 8 tashkeel vowels
    [...string].forEach(char => result += (/[\u064B-\u0652]/.test(char)) ? '<span style="color:' + (oneColor ? oneColor : colorTable[char.charCodeAt() - 1611]) + '">&#8203' + char + '</span>' : char);
    return result;
    }; 
    const [input, setInput] = useState() as any;
  const [final, setFinal] = useState() as any;
  let output = {} as any;
  let output2 = {} as any;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(input)
    
      await axios.post(`http://127.0.0.1:5000/?input=${input}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        input: input,
      })
        .then(function (response: { data: any; }) {

         output = response.data.Output
          console.log(output)          
          output2 = colorizeTashkeel(output)
          console.log(output2)
          setFinal(output2)
        })
        .catch(function (error: any) {
          console.log(error);
        })
    
    

  }



  return (
    //simple form
    <div className="container gird grid-cols-12 ">
    <div className="w-full max-w-xs grid-start-5">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit} >
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        الكلام بدون التشكيل
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="ادخل النص" onChange={(e) => setInput(e.target.value)}/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        الكلام بالتشكيل
      </label>
      <div className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" 
       dangerouslySetInnerHTML={{ __html: final }}/>
      
      
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"  >
        شكل
      </button>
      
    </div>
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
</div>

    // <form onSubmit={handleSubmit}>
    //   <div classNameName={styles.container}>
    //     <div classNameName={styles.input}>
    //       <input type="text" placeholder="Enter your text" onChange={(e) => setInput(e.target.value)} />
    //     </div>
    //     <div classNameName={styles.button}>
    //       <button type="submit" >
    //         Translate
    //       </button>
    //       <button type="submit">
    //         Reset
    //       </button>
    //     </div>
    //   </div>
    //   <div classNameName={styles.result}>
    //     {final}
    //   </div>
    // </form>

  )
}


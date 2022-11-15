import React, { useState, useEffect } from 'react';
import { getAlldatafromHSD, getAlldatafromFO, getAlldatafromPMG, getAlldatafromLPG } from '../../lib/shipping-in/utils';




export default function OverAll() {
    const [hsd, setHsd] = useState([])
    const [fo, setFo] = useState([])
    const [pmg, setPmg] = useState([])
    const [lpg1, setLpg1] = useState([])
    const [totalTL, setTotalTL] = useState(0)
    const [totalLitres85, setTotalLitres85] = useState(0)
    const [totalLitres60, setTotalLitres60] = useState(0)
    const [total, setTotal] = useState([])







    useEffect(() => {
        async function fetchData() {
            setHsd(await getAlldatafromHSD());

            setPmg(await getAlldatafromPMG());

            setFo(await getAlldatafromFO());

            setLpg1(await getAlldatafromLPG());
            console.log(hsd)

        }
        
        function totaling() {
            hsd.length!==0?setTotal([...hsd, ...fo, ...pmg, ...lpg1]):null
            console.log(total)
            setTotalTL(total.length)
            console.log(totalTL)
            setTotalLitres60(total?.reduce((a, b) => a + b.litresAt60, 0))
            setTotalLitres85(total?.reduce((c, d) => c + d.volumeAt85, 0))
        }
        
        
        
        
        fetchData()
        
        totaling()


    }, []);

    return (

        <>
            <div className='ml-[25vw]'>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>No. T/Ls</th>
                            <th>Litres(OBS)</th>
                            <th>Litres at 85 F</th>
                            <th>Litres at 60 F</th>
                            <th>Bbls at 60 F</th>
                            <th>M.Tons</th>
                            <th>M.Tons (OBS)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                HSD
                            </td>
                            <td>
                                {hsd?.length}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                {hsd.length!==0?hsd.reduce(function (sum, current) {
                                    return sum + current.volumeAt85;
                                }, 0):"-"}
                            </td>
                            <td>
                                {fo.length!==0?hsd.reduce(function (sum, current) {
                                    return sum + current.litresAt60;
                                }, 0):"-"}



                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>

                        </tr>
                        <tr>
                            <td>
                                PMG
                            </td>
                            <td>
                                {pmg?.length}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                {pmg.length!==0?pmg.reduce(function (sum, current) {
                                    return sum + current.volumeAt85;
                                }, 0):"-"}
                            </td>
                            <td>
                                {fo.length!==0?pmg.reduce(function (sum, current) {
                                    return sum + current.litresAt60;
                                }, 0):"-"}



                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>

                        </tr>
                        <tr>
                            <td>
                                FO
                            </td>
                            <td>
                                {fo?.length}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                {fo.length!==0?fo.reduce(function (sum, current) {
                                    return sum + current.volumeAt85;
                                }, 0):"-"}
                            </td>
                            <td>
                                {fo.length!==0?fo.reduce(function (sum, current) {
                                    return sum + current.litresAt60;
                                }, 0):"-"}



                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>

                        </tr>
                        <tr>
                            <td>
                                LPG
                            </td>
                            <td>
                                {lpg1?.length}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                {lpg1.length!==0?lpg1.reduce(function (sum, current) {
                                    return sum + current.volumeAt85;
                                }, 0):"-"}
                            </td>
                            <td>
                                {lpg1.length!==0?lpg1.reduce(function (sum, current) {
                                    return sum + current.litresAt60;
                                }, 0):"-"}



                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>

                        </tr>
                        <tr>
                            <td>
                                Total
                            </td>
                            <td>
                                {totalTL}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                {totalLitres85}
                            </td>
                            <td>
                                {totalLitres60}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>


                        </tr>

                    </tbody>

                </table>

            </div>

        </>


    )
}
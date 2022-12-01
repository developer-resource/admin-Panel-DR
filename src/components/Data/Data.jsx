import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './data.css'
const Data = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        let result = await fetch('https://admin-panel-backend-production.up.railway.app/api/jobs');

        result = await result.json()

        setData(result)

        console.log(result)
    }


    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="dataContainer container-fluid p-0 ">

            <table class="table table-responsive table-hover">
                <thead>
                    <tr className='bg-dark text-white'>
                        <th scope="col">S No.</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Tags</th>
                        <th scope="col">Location</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Experience</th>
                        <th scope="col">Portal Link</th>
                        <th scope="col">Job Desc</th>
                        <th scope="col">Logo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, index) => {
                        return (
                            <>
                                <tr className='tableData'>
                                    <th>{index + 1}</th>
                                    <th className='fw-light'>{val.companyName}</th>
                                    <td>{val.jobTitle}</td>
                                    <td>{val.tags.map((val, index) => {
                                        return <>
                                            {val+' '}
                                        </>

                                    })}</td>
                                    <td>{val.location}</td>
                                    <td>{val.duration}</td>
                                    <td>{val.startDate}</td>
                                    <td>{val.expectedSalary}</td>
                                    <td>{val.experience}</td>
                                    <td>{val.portalLink}</td>
                                    <td>{val.jobDescription}</td>
                                    <td><img src={val.profileImg} alt="Logo" className='companyLogo' /></td>
                                </tr>
                            </>
                        )
                    })}


                </tbody>
            </table>


        </div>
    )
}

export default Data
'use client'
import ReachUsImage from './ReachUsImage'
import ReachUsText from './ReachUsText'

export default function ReachUs({ serviceData, color }) {

  const data = serviceData.data.find((item)=>item.section == 'ladder')

  return (
        <div             
            className='w-full lg:w-5/6 mx-auto h-max md:h-screen px-2 md:px-8 flex flex-col-reverse md:grid md:grid-cols-2 pt-16 py-32 gap-2 md:gap-8'
        >
            <ReachUsImage data={data} color={color} />
            <ReachUsText data={data} color={color} />            
        </div>
  )
}

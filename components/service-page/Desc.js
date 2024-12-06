
import DescReasons from './DescReasons'
import DescTitle from './DescTitle'

export default function Desc({ serviceData, color }) {
          
    const data = serviceData.data.find((item)=>item.section == 'reasons')

  return (
    <div className=''>              
        <div>
            <DescTitle data={data} color={color} />
            <div 
                className='grid grid-cols-2 p-4 gap-2 md:gap-16 mx-auto py-8 sm:py-16 lg:py-32' 
            >
                {
                    data.cards.map((reason) => {
                        return (
                            <DescReasons reason={reason} color={color} key={reason.id} />
                        )
                    })
                }
            </div>            
        </div>

    </div>
  )
}

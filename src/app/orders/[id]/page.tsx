import { wixClientServer } from "@/lib/wixClientServer"


const OrderPage = async ({params}:{params:{id:string}}) => {

  const id = params.id

  const wixClient = await wixClientServer()

  return (
    <div className=''>
      orderPage
    </div>
  )
}

export default OrderPage
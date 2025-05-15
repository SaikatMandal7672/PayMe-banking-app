import { getServerSession } from "next-auth";


export const createP2PTransactions = async (reciever: string, amount: number) => {
    const session = await getServerSession();
    if(!session?.user){
        return {
            success:false,
            message:"User not signed in"
        }
    }
    if(!reciever || !amount){
        return {
            success:false,
            message:"Recieved null as one of the parameters"
        }
    }
    //@ts-ignore
    const userId = session.user.id;
    
}
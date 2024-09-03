import {useCallback, useEffect, useState} from 'react'

type MyFormData={
    //是個鍵值對的對象
    [key:string]:any
}

interface DataFetcher<T>{
    //要調用api接口的函數時，函數所需要引入的參數args(包含了formData、page、pageSize)，以及該接口函數的回傳值是個Promise，Promise的取出來之後的值可以是any
    (args:T&{page:number,pageSize:number}):Promise<any>
}

function useDataList<T extends MyFormData,U>(initialFormData:T,fetchData:DataFetcher<T>){
    const [dataList, setDataList] = useState<U[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [formData, setFormData] = useState<T>(initialFormData)

    const loadData = useCallback(async()=>{
        setLoading(true);
        try{
            const {data:{list,total}} = await fetchData({page,pageSize,...formData})
            setDataList(list);
            setTotal(total)
        }catch(error){
            console.log(error)  //失敗的話
        }finally{
            setLoading(false); //最後一定要執行的
        }
    },[formData,page,pageSize,fetchData])
    //formData、page、pageSize、fetchData有變動時才取消緩存，刷新函數體。函數本來是調用的時候才創建出來，調用完就回收掉，現在被緩存起來就不會被重複創建。

    useEffect(()=>{
        loadData()
    },[page,pageSize,fetchData])  //本來是loadData這個函數有變動的時候才進行刷新，現在改成依據頁碼、pageSize、fetchData有變動才刷新

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    const onChange=(page:number,pageSize:number)=>{
        setPage(page);
        setPageSize(pageSize)
    }

    const reset=()=>{
        setFormData(initialFormData);
        setPage(1);
        setPageSize(10);
    }

    return {dataList,page,pageSize,total,loading,formData,setDataList,setPage,setPageSize,setTotal,setLoading,setFormData,loadData,onChange,handleChange,reset}
}

export default useDataList
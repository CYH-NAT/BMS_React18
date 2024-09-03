import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function exportToExcel(data:any,header:string[]){
  //工作表
  const ws=XLSX.utils.json_to_sheet(
    //將json換成工作表
    data,{header}  
  )
  const wb = XLSX.utils.book_new() //創一個工作簿
  XLSX.utils.book_append_sheet(wb,ws,'sheet1') //把工作表加入工作簿中
  const buf=XLSX.write(wb,{bookType:'xlsx',type:'buffer'})  //buffer 處理瀏覽器中的二進制數據
  //保存和下載
  saveAs(new Blob([buf],{type:'application/octet-stream'}),'selected-data.xlsx')  //Blob對象封裝了一個下載內容
}


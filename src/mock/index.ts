import Mock from "mockjs"
import roomPic from '../assets/roomPic.jpg'

Mock.setup({
    timeout: "200-600"
})
//登錄接口
Mock.mock("https://www.demo.com/login", "post", (options: any) => {
    //console.log("options",options.body)
    const { username, password } = JSON.parse(options.body)
    if (username === "admin" && password === "admin123123") {
        return {
            code: 200,
            message: "登入成功",
            data: {
                username: "趙鐵柱",
                token: "mocktoken123456admin"
            }
        }
    } else if (username === "manager" && password === "manager123123") {
        return {
            code: 200,
            message: "登入成功",
            data: {
                username: "manager",
                token: "mocktoken123456manager"
            }
        }
    } else if (username == "user" && password === "user123123") {
        return {
            code: 200,
            message: "登入成功",
            data: {
                username: "user",
                token: "mocktoken123456user"
            }
        }
    } else {
        return {
            code: 401,
            message: "用戶名或密碼有誤",
            data: ""
        }
    }


})

const menuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租戶管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租戶列表",
                "key": "/users/list",
            },
            // {
            //     "icon": "UserAddOutlined",
            //     "label": "新增租戶",
            //     "key": "/users/add",
            // }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物業管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "樓宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房間管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "車輛信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "報修管理",
        "key": "/repair"
    },
    {
        "icon": "DollarOutlined",
        "label": "財務管理",
        "key": "/finance",
        "children": [
            {

                "icon": "ProfileOutlined",
                "label": "契約管理",
                "key": "/finance/contract",

            },
            {
                "icon": "FrownOutlined",
                "label": "契約詳情",
                "key": "/finance/surrender",
            },
            {
                "icon": "FileTextOutlined",
                "label": "賬單管理",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "運營管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "運營總覽",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章發布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "內容評論",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "設備管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系統設置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "個人中心",
        "key": "/personal",
    }
]

const userMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租戶管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租戶列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租戶",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物業管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "樓宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房間管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "車輛信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "報修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "設備管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "個人中心",
        "key": "/personal",
    }
]

const managerMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租戶管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租戶列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租戶",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物業管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "樓宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房間管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "車輛信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "報修管理",
        "key": "/repair"
    },
    {
        "icon": "DollarOutlined",
        "label": "財務管理",
        "key": "/finance",
        "children": [
            {

                "icon": "ProfileOutlined",
                "label": "契約管理",
                "key": "/finance/contract",

            },
            {
                "icon": "FrownOutlined",
                "label": "",
                "key": "/finance/surrender",
            },
            {
                "icon": "FileTextOutlined",
                "label": "賬單管理",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "運營管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "運營總覽",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章發布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "內容評論",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "設備管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "個人中心",
        "key": "/personal",
    }
]

const customizeMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租戶管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租戶列表",
                "key": "/users/list",
            },
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物業管理",
        "key": "/estate",
        "children": [
            {
                "icon": "InsertRowLeftOutlined",
                "label": "樓宇管理",
                "key": "/estate/tenement",
            },

        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "報修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "設備管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "個人中心",
        "key": "/personal",
    }
]


//菜單接口
Mock.mock('https://www.demo.com/menu', "get", (options: any) => {
    const token = sessionStorage.getItem("token");
    if (token == "mocktoken123456admin") {
        return {
            code: 200,
            message: '請求成功',
            data: menuList
        }
    } else if (token == "mocktoken123456user") {
        return {
            code: 200,
            message: '請求成功',
            data: userMenuList
        }
    } else if (token == "mocktoken123456manager") {
        return {
            code: 200,
            message: '請求成功',
            data: managerMenuList
        }
    } else {
        return {
            code: 200,
            message: "失敗",
            data: []
        }
    }
})
//dashboard里 圖表接口

Mock.mock('https://www.demo.com/energyData', "get", () => {
    return {
        code: 200,
        message: "請求成功",
        data: [
            { name: "煤", data: [120, 132, 101, 134, 90, 230, 210] },
            { name: "天然氣", data: [220, 182, 191, 234, 290, 330, 310] },
            { name: "油", data: [150, 232, 201, 154, 190, 330, 410] },
            { name: "電", data: [320, 332, 301, 334, 390, 330, 320] },
            { name: "熱", data: [820, 932, 901, 934, 1290, 1330, 1320] }
        ]
    }
})

Mock.Random.extend({  //電話的隨機數要自己拓展
    phone: function () {
        var phonePrefixs = ['13', '14', '15', '16', '17', '18', '19'] // 自己寫前綴哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{9}/) //Number()
    }
})

//租戶列表的接口
Mock.mock("https://www.demo.com/userList", "post", (options: any) => {
    const { pageSize, page, companyName, contact, phone } = JSON.parse(options.body)
    console.log("租戶列表接收到參數", page, pageSize, companyName, contact, phone)
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [    //本來list|70，因為list|是mock當中的對象名，所以用模板字符串再加上[]，使得屬性名為變量
                {
                    "id": "@string('number',6)",//隨機生成一個六位數字id
                    "name": "@cname",//隨機生成一個人名
                    "status|1": ["1", "2", "3"],//從裡面隨機選一項
                    "tel": '@phone',
                    "business|1": ['製造業', '互聯網', '新媒體', '美業', '新能源', '物流', '電商'],
                    "email": "@email",
                    "creditCode": "@string('number',18)",
                    "industryNum": "@string('number',15)",
                    "organizationCode": "@string('upper',9)",//隨機生成9位大寫
                    "legalPerson": "@cname",//mockjs有文檔可以查
                },
            ],
            total: 78 //條目的總數
        })
    }
})

//刪除企業
Mock.mock('https://www.demo.com/deleteUser', 'post', (options: any) => {
    const { id } = JSON.parse(options.body);
    console.log("刪除企業", id);
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})

//批量刪除企業
Mock.mock('https://www.demo.com/batchDeleteUser', 'post', (options: any) => {
    const { ids } = JSON.parse(options.body);
    console.log("ids", ids)
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})
//編輯企業
Mock.mock('https://www.demo.com/editUser', 'post', (options: any) => {
    console.log("編輯企業收到參數", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})
//獲取房間列表的接口
function generateRooms() {
    const rooms = [];
    for (let i = 0; i < 50; i++) {
        const floor = 1 + Math.floor(i / 6); // 每6個房間一層
        const roomNumber = floor * 100 + (101 + (i % 6)); // 計算房間號
        rooms.push({
            roomNumber,
            decorationType: Mock.Random.pick(['毛坯', '精裝']),
            area: Mock.Random.integer(70, 300),
            unitPrice: Mock.Random.integer(1, 3),
            src: roomPic
        });
    }
    return rooms;
}
Mock.mock('https://www.demo.com/roomList', 'post', (options: any) => {
    console.log("收到房間id", JSON.parse(options.body).roomid)
    return {
        code: 200,
        message: "成功",
        data: {
            rooms: generateRooms()
        }
    };
});

//契約管理
Mock.mock('https://www.demo.com/contractList', 'post', (options: any) => {
    const { page, pageSize } = JSON.parse(options.body);
    console.log("後端契約管理接到參數", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'contractNo': '@string("number", 6)',
                'type|1': ['租賃契約', '自定義契約', '購買契約'],
                'name|1': ["房屋租賃契約通用模版", "車位租賃契約通用模版", "商業房產買賣契約"],
                "startDate|1": ['2023-01-01', '2023-03-05', '2023-04-01'],
                "endDate|1": ['2024-01-01', '2024-03-05', '2024-04-01'],
                'jia|1': ['萬物科技有限公司', '大魚網絡科技', '六六信息技術有限公司'],
                'yi': '天明物業有限公司',
                'status|1': ["1", "2", "3"],
            }],
            "total": 54
        })
        // 生成55條數據
    }
});

//賬單管理
Mock.mock('https://www.demo.com/billList', 'post', (options: any) => {
    const { page, pageSize, companyName, contact, phone } = JSON.parse(options.body);
    console.log("後端賬單管理接到參數", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'accountNo': '@string("number", 6)',
                'status|1': ['1', '2'],
                'roomNo|1': ["A1幢寫字樓-201", "B1幢寫字樓-402", "B2幢寫字樓-701", "C2幢寫字樓-1601"],
                "carNo|1": ['B109', 'C227', 'C106', "D158"],
                "tel|1": ['@phone'],
                'costName1|1': [1278.00, 2633.00, 3698.00],
                'costName2': '200元/月',
                'costName3|1': ["25800/年", "19800/年"],
                'startDate': "2023-01-01",
                'endDate': "2024-01-01",
                'preferential': 0.00,
                'money': 26000.00,
                'pay|1': ["微信", "支付寶", "現金", "銀行卡轉賬"]
            }],
            "total": 54
        })
        // 生成55條數據
    }
});

//設備管理
Mock.mock('https://www.demo.com/equipmentList', 'post', (options: any) => {
    const { page, pageSize, companyName, contact, phone } = JSON.parse(options.body);  //options.body能得到前端傳出去的參數
    console.log("後端護備管理接到參數", options)
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 1001,
                'name|1': ['智能供水機組', 'A1幢寫字樓供暖護備','園區大門入口閘機','球機攝像頭','C1幢寫字樓中央空調','B區充電樁','B2-21-電梯','路燈設備1'],
                'no|1': ["CP-ONYU-1098", "H876-09", "CDU-B09-21"], //設備編號
                "person": '@cname', //負責人
                "tel|1": ['@phone'],
                'time|1': ["20年", "15年","10年"],
                'rest': "7年",
                'status|1': [1,2,3],
                'last': ["2023-11-11",'2024-05-06'],
                'type|1': ["型號1", "型號2", "型號3"],
                'from|1':['上海科技股份有限公司','武漢能源設備有限公司','重慶某照明有限公司']
            }],
            "total": 66
        })
        // 生成66條數據
    }
});

//賬號管理
Mock.mock('https://www.demo.com/accountList', 'post', (options: any) => {
    //  const {page,pageSize,companyName,contact,phone}=JSON.parse(options.body);
    console.log("後端賬號管理接到參數", options)
    return {
        code: 200,
        message: "成功",
        data: {
            list: [
                {
                    id: 1001, accountName: "xuchao", auth: "admin", person: "徐超", tel: "188888888888", department: "總裁辦", menu: menuList
                },
                {
                    id: 1002, accountName: "user01", auth: "user", person: "王麗麗", tel: "17777777777", department: "網推部", menu: userMenuList
                },
                {
                    id: 1003, accountName: "manager01", auth: "manager", person: "劉偉", tel: "16666666666", department: "財務部", menu: managerMenuList
                },
                {
                    id: 1004, accountName: "user02", auth: "customize", person: "張安定", tel: "15555555555", department: "企劃部", menu: customizeMenuList
                },
                {
                    id: 1005, accountName: "laowang", auth: "user", person: "王大大", tel: "14444444444", department: "總裁辦", menu: userMenuList
                }

            ],
            total: 5
        }
    }
});
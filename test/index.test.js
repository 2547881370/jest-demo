describe('匹配器', () => {
    test("数值相加" , () => {
        expect(2 + 2).toBe(4)
    })

    test("object" , () => {
        const data = { one : 1}
        data["two"] = 2
        expect(data).toEqual({ one :1  , two :2 })
    })

    test("undefined null false true 匹配器" , () => {
        expect(null).toBeNull()
        expect(undefined).toBeUndefined()   
        expect("123").toBeDefined()
        expect(true).toBeTruthy()
        expect(false).toBeFalsy()
    })

    test("数字匹配器",() => {
        const value =  2  + 2

        expect(value).toBeGreaterThan(3)
        expect(value).toBeGreaterThanOrEqual(3.5)
        expect(value).toBeLessThan(5)
        expect(value).toBeLessThanOrEqual(4)

        expect(value).toBe(4)
        expect(value).toEqual(4)
    })

    test("浮点数" , () => {
        const value = 0.1 + 0.2 
        expect(value).toBeCloseTo(0.3)
    })

    test("数组匹配器" , () => {
        const arr = [
            'diapers',
            'kleenex',
            'trash bags',
            'paper towels',
            'beer',
          ];
          expect(arr).toContain('beer')
    })

    test("error" , () => {
        function error(){
            throw new Error("报错信息")
        }

        expect(error).toThrow("报错信息")
    })

    test("测试异步代码" , (done) => {
        function fetchData(call){
            setTimeout(() => {
                call("内容")
            },3000)
        }

        fetchData((data) => {
            expect(data).toBe("内容")
            done()
        })
    })

    test("测试异步代码 promise" , () => {
        function fetchData(){
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("内容")
                },3000)
            }) 
        }
        expect.assertions(1)
        return fetchData().then((data) => {
            expect(data).toBe("内容")
        })
    })

    test("测试异步代码 async await" , async () => {
        function fetchData(){
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("内容")
                },3000)
            }) 
        }
        expect.assertions(1)
        const data = await fetchData()
        expect(data).toBe("内容")
    })

})

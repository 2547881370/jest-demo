# Jest 语法


## 1. 匹配器
```
// toBe()  精准匹配 , 只能检测常规类型

test('数值相加 , 等于2' , () => {
    expect(2+2).toBe(4)
})

// toEqual()  精准匹配 : 可以检测对象
test("检测object对象,是否是预期结果" , () => {
    const data = { one : 1}
    data["two"] = 2
    expect(data).toEqual({one : 1 , two : 2})
})
```

## 2. undefined null false true 匹配器
```
// toBeNull 只匹配null
// toBeUndefined 只匹配undefined
// toBeDefine 只匹配有值
// toBeTruthy 只匹配为true
// toBeFalsy 只匹配为false


test("Truthiness" , () => {
    // toBeNull 只匹配null
    expect(null).toBeNull()

    // toBeUndefined 只匹配undefined
    expect(undefined).toBeUndefined()

    // toBeDefine 只匹配有值
    expect("123").toBeDefine()

    // toBeTruthy 只匹配为true
    expect(true).toBeTruthy()

    // toBeFalsy 只匹配为false
    expect(false).toBeFalsy()
})
```

## 3. 数字匹配器 大多数比较有等价的匹配器
```
// toBeGreaterThan() 大于
// toBeGreaterThanOrEqual() 大于或者等于
// toBeLessThan() 小于
// toBeLessThanOrEqual() 小于或等于
// toBe和toEqual只适用于数字,不适用小数
// toBeCloseTo() 小数使用这个

test("数字匹配器" , () => {
    const value = 2 + 2

    // 大于
    expect(value).toBeGreaterThan(3);

    // 大于或者等于
    expect(value).toBeGreaterThanOrEqual(3.5);

    // 小于
    expect(value).toBeLessThan(5);

    // 小于或等于
    expect(value).toBeLessThanOrEqual(4.5);

    expect(value).toBe(4);
    expect(value).toEqual(4);
})

test('两个浮点数字相加', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);    // 这句会报错，因为浮点数有舍入误差
  expect(value).toBeCloseTo(0.3); // 这句可以运行
});
```

## 4. 字符串匹配器
使用toMatch()测试字符串，传递的参数是正则表达式。
```
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

## 5. 数组匹配器
如何检测数组中是否包含特定某一项？可以使用toContain()
```
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('购物清单（shopping list）里面有啤酒（beer）', () => {
  expect(shoppingList).toContain('beer');
});
```

## 6 .测试error
```
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```



## 7. 测试异步代码
### 1. 使用done进行等待
使用单个参数调用done，而不是将测试放在一个空参数的函数中，Jest会等done回调函数执行结束后，结束测试。
如果done()永远不会被调用，则说明这个测试将失败
```
function fetchData(call) {
  setTimeout(() => {
    call('peanut butter1')
  },1000);
}

test('the data is peanut butter', (done) => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done()
  }
  fetchData(callback);
});

```

### 2. 返回promise
注意：一定要返回Promise，如果省略了return语句，测试将会在fetchData完成之前完成。
```
test('the data is peanut butter', () => {
  expect.assertions(1);
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

### 3. Async/Await
```
test('the data is peanut butter', async () => {
  expect.assertions(1);
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

## 8. beforeEach afterEach beforeAll afterAll
```
beforeEach afterEach 是同步的
beforeAll afterAll 是异步的
```

写测试的时候，我们经常需要进行测试之前做一些准备工作，和在进行测试后需要进行一些整理工作。Jest提供辅助函数来处理这个问题。


```
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach  //特别注意
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

[详细](https://www.jianshu.com/p/e54218d67628)
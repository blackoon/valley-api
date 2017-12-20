package com.hylanda;  

import com.sun.jna.Library;
import com.sun.jna.Native;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月15日 上午11:08:08 
 * note
 */
public class InvokeTest {
	 /**
     * 调用示例
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        System.out.println(System.getProperty("java.version"));//输出当前jdk版本号
        System.out.println(System.getProperty("sun.arch.data.model"));//输出当前jdk所用平台
         
        CLibrary1 clib = CLibrary1.INSTANCE;
        System.out.println("测试返回结果："+clib.add(13, 13));
        System.out.println("测试返回结果："+clib.getString("this is java param."));
        System.out.println("测试返回结果："+clib.reverse(true));
         
    }
}
/**
 * 必要接口，必须包含INSTANCE实例和需要调用的方法声明。
 * @author stagebo
 *
 */
interface CLibrary1 extends Library {
    CLibrary1 INSTANCE = (CLibrary1) Native.
            loadLibrary("D:\\blackoon\\source\\repos\\java调用CsharpDLL实例\\x64\\Debug\\CPPDLL",
            		//blackoon\\source\\repos\\java调用CsharpDLL实例\\x64\\Debug
            CLibrary1.class);
 
    /*需要调用的方法,方法名与c++方法名相同*/
    int add(int a,int b);
    String getString(String a);
    boolean reverse(boolean flag);
}
  
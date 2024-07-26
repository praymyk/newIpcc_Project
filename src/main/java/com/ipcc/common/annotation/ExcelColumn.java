package com.ipcc.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
/*
*  엑셀의 컬럼명을 지정하기 위한 어노테이션
*   Dto 에 엑셀 헤더 이름을 애너테이션으로 설정, ExcelUtils 에서 reflection을 사용하여
*   각 @Excel
* */
public @interface ExcelColumn {

    String headerName() default "";

}

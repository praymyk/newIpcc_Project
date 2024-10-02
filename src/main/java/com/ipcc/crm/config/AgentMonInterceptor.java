package com.ipcc.crm.config;

import com.ipcc.common.websocket.MyWebSocketHandler;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Intercepts({
        @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}),
        @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class})
})
@Component
public class AgentMonInterceptor implements Interceptor {

    private final MyWebSocketHandler myWebSocketHandler;

    @Autowired
    public AgentMonInterceptor(MyWebSocketHandler myWebSocketHandler) {
        this.myWebSocketHandler = myWebSocketHandler;
    }

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 쿼리 실행
        Object result = invocation.proceed();

        // 쿼리 후 처리
        MappedStatement ms = (MappedStatement) invocation.getArgs()[0];
        String statementId = ms.getId();

        // 특정 Mapper 메서드가 호출되었는지 확인
        if (statementId.endsWith("insertAgentMon") || statementId.endsWith("updateAgentMon")) {
            // WebSocket을 통해 클라이언트에 알림 전송
            myWebSocketHandler.sendMessageToAll("agent_mon_table_updated");
        }

        return result;
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 추가 설정이 필요한 경우 여기에 처리
    }
}

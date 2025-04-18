ENDS-POINTS QUE NÃO ESTÃO FUNCIONANDO

1. Tipos de diabetes (Status code = 500)
/medicalRecord/diabetes

ERROR  ERRO NO PROCESSO DE SALVAMENTO: {"dadosResposta": {"error": "Internal Server Error", "message": "Erro interno do servidor.", "statusCode": 500}, "headerEnviado": {"Accept": "application/json, text/plain, */*", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NDk5NDUzNiwiZXhwIjoxNzQ1MDIzMzM2fQ.eRxdIC16g0_6KKrfJW4h8vFTRHz1ZkFZHemb91eF0qg", "Content-Type": "application/json"}, "mensagemErro": "Request failed with status code 500", "payloadEnviado": {"diabetesId": 1, "userId": 2}, "statusCode": 500}

2. Administração de Insulina (Status code = 500)
/medicalRecord/adminInsulina

ERROR  Erro na requisição: {"error": "Internal Server Error", "message": "Erro interno do servidor.", "statusCode": 500}

3. Meta Glicêmica (Status code = 500)
/medicalRecord/metaGlicemica

ERROR  Erro na requisição: {"error": "Internal Server Error", "message": "Erro interno do servidor.", "statusCode": 500}

4. Adicionar medicação (Status code = 400)
/userMedicines

ERROR  Erro na requisição: {"error": "Bad Request", "message": ["tipoDosagem must be one of the following values: "], "statusCode": 400}

5. Registrar glicemia

 /medicalRecord/tiposGlicemia
 * GET -> ERROR  Erro ao buscar glicemia: [AxiosError: Request failed with status code 404]

/medicalRecord/userGlicemia
 * POST -> Como GET não funciona, não tem como selecionar o valor de tipo para enviar os dados validos 
 ERROR  Erro de validação: Verifique os dados enviados.
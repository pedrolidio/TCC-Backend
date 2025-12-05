function errorHandler(err, req, res, next) {
  console.error("Erro:", err.message);

  const status = err.status || 500;

  const messages = {
    MISSING_FIELDS: "Todos os campos são obrigatórios!",
    INVALID_LICENSE: "CNH inválida: dígitos verificadores incorretos.",
    DUPLICATE_LICENSE: "Condutor com CNH já cadastrada!",
    DRIVER_NOT_FOUND: "Condutor não encontrado.",
    DUPLICATE_LICENSE_PLATE: "Veículo com placa já cadastrada!",
    VEHICLE_NOT_FOUND: "Veículo não encontrado.",
    SENSORS_NOT_FOUND: "O veículo não possui sensores OBD cadastrados!",
    INVALID_COMMANDS_ARRAY: "O campo supported_obd_commands deve ser um array de strings.",
    NO_VALID_OBD_COMMANDS: "Nenhum comando OBD válido foi enviado.",
    OBD_COMMANDS_NOT_FOUND_IN_DB: "Nenhum dos comandos OBD enviados foi encontrado no banco de dados.",
    SENSORS_ALREADY_REGISTERED: "Veículo com sensores já cadastrados!",
    NO_ACTIVE_CONFIG: "Nenhuma configuração de direção ativa foi encontrada para este veículo.",
    CONFIG_NOT_FOUND: "Configuração de direção não encontrada.",
    VEHICLE_CONFIGS_NOT_FOUND: "Nenhuma configuração de direção foi encontrada para este veículo.",
    UNSUPPORTED_SENSOR_FOR_VEHICLE: "Comando OBD não suportado para este veículo.",
    MISSING_CONFIG_ID_PARAM: "O parâmetro \"driving_configuration_id\" é obrigatório.",
    MISSING_DATA_BODY_FIELDS: "Os campos \"vehicle_id\" e \"timestamp\" são obrigatórios.",
    MISSING_GPS_DATA: "Configuração ativa espera dados de GPS (latitude/longitude), mas não foram recebidos.",
    EXTRA_GPS_DATA: "Dados de GPS (latitude/longitude) foram recebidos, mas não são esperados pela configuração ativa.",
    EXTRA_SENSOR_DATA: "Um sensor foi recebido, mas não é esperado pela configuração ativa.",
    MISSING_SENSOR_DATA: "A configuração ativa espera dados de um sensor, mas não foram recebidos.",
    NO_ACTIVE_CONFIG_FOR_VEHICLE: "Não há configuração de direção ativa para este veículo. Não é possível salvar os dados.",
    USER_NOT_FOUND: "Usuário não encontrado.",
    PASSWORD_TOO_SHORT: "A senha deve ter no mínimo 8 caracteres!",
    DUPLICATE_USERNAME: "Usuário com username já cadastrado!",
    INVALID_CREDENTIALS: "Credenciais de autenticação inválidas!",
    TOKEN_NOT_PROVIDED: "Token de acesso não fornecido.",
    TOKEN_MALFORMATTED: "Token mal formatado. O formato esperado é 'Bearer <token>'.",
    INVALID_TOKEN: "Token inválido ou expirado.",
    ACCESS_DENIED: "Acesso negado: Usuário não autenticado.",
    FORBIDDEN: "Acesso proibido: Você não tem permissão para acessar este recurso.",
  };

  const message = messages[err.message] || "Erro interno do servidor.";
  res.status(status).json({ error: message });
}

module.exports = errorHandler;

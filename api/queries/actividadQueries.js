export default {
  getActividadesConInstructores: `select actividad.id as id, (select tipo_actividad.nombre from tipo_actividad where actividad.id_tipo=tipo_actividad.id_tipo) as nombre,actividad.cupo_maximo as cupo_maximo, actividad.cupo_disponible, actividad.costo as costo, (select persona.nombre from persona where actividad.id_instructor=id ) as instructor, (select persona.nombre from persona where actividad.id_suplente=id ) as suplente, actividad.cupo_disponible as cupo_disponible, (select GROUP_CONCAT(dia.nombre, ' ' ,horario.hora_inicio,' - ' , horario.hora_final) from horario, actividad_dia_horario, dia where actividad.id=actividad_dia_horario.id_actividad and actividad_dia_horario.id_horario = horario.id_horario and actividad_dia_horario.id_dia = dia.id) as horario from actividad where actividad.id_instructor!=-1 and actividad.id_suplente!=-1;`,
  getActividadesSinInstructores: `select actividad.id as id, (select tipo_actividad.nombre from tipo_actividad where actividad.id_tipo=tipo_actividad.id_tipo) as nombre,actividad.cupo_maximo as cupo_maximo, actividad.cupo_disponible, actividad.costo as costo, (select persona.nombre from persona where actividad.id_instructor=id ) as instructor, (select persona.nombre from persona where actividad.id_instructor=id ) as suplente, actividad.cupo_disponible as cupo_disponible, (select GROUP_CONCAT(dia.nombre, ' ' ,horario.hora_inicio,' - ' , horario.hora_final) from horario, actividad_dia_horario, dia where actividad.id=actividad_dia_horario.id_actividad and actividad_dia_horario.id_horario = horario.id_horario and actividad_dia_horario.id_dia = dia.id) as horario from actividad where actividad.id_instructor=-1 and actividad.id_suplente=-1;`,
  getActividadesSinSuplente: `select actividad.id as id, (select tipo_actividad.nombre from tipo_actividad where actividad.id_tipo=tipo_actividad.id_tipo) as nombre,actividad.cupo_maximo as cupo_maximo, actividad.cupo_disponible, actividad.costo as costo, (select persona.nombre from persona where actividad.id_instructor=id ) as instructor, (select persona.nombre from persona where actividad.id_suplente=id ) as suplente, actividad.cupo_disponible as cupo_disponible, (select GROUP_CONCAT(dia.nombre, ' ' ,horario.hora_inicio,' - ' , horario.hora_final) from horario, actividad_dia_horario, dia where actividad.id=actividad_dia_horario.id_actividad and actividad_dia_horario.id_horario = horario.id_horario and actividad_dia_horario.id_dia = dia.id) as horario from actividad where actividad.id_instructor!=-1 and actividad.id_suplente=-1;`,
  getActividadesConCupoNoInscritas: `select actividad.id as id, tipo_actividad.nombre as nombre,actividad.cupo_maximo as cupo_maximo, actividad.cupo_disponible, actividad.costo as costo, (select persona.nombre from persona where actividad.id_instructor=persona.id ) as instructor, (select persona.nombre from persona where actividad.id_suplente=persona.id ) as suplente, actividad.cupo_disponible as cupo_disponible, (select GROUP_CONCAT(dia.nombre, ' ' ,horario.hora_inicio,' - ' , horario.hora_final) from horario, actividad_dia_horario, dia where actividad.id=actividad_dia_horario.id_actividad and actividad_dia_horario.id_horario = horario.id_horario and actividad_dia_horario.id_dia = dia.id) as horario from actividad, tipo_actividad where actividad.id not in (select DISTINCT(id_actividad) from socio_actividad where socio_actividad.id_socio= ? ) and actividad.id_tipo=tipo_actividad.id_tipo and actividad.cupo_disponible>0;`,
  getActividadesInscritasSocio: `select actividad.id as id, (select tipo_actividad.nombre from tipo_actividad where actividad.id_tipo=tipo_actividad.id_tipo) as nombre,actividad.cupo_maximo as cupo_maximo, actividad.cupo_disponible, actividad.costo as costo, (select persona.nombre from persona where actividad.id_instructor=persona.id ) as instructor, (select persona.nombre from persona where actividad.id_suplente=persona.id ) as suplente, actividad.cupo_disponible as cupo_disponible, (select GROUP_CONCAT(dia.nombre, ' ' ,horario.hora_inicio,' - ' , horario.hora_final) from horario, actividad_dia_horario, dia where actividad.id=actividad_dia_horario.id_actividad and actividad_dia_horario.id_horario = horario.id_horario and actividad_dia_horario.id_dia = dia.id) as horario from actividad where actividad.id_instructor= ? or actividad.id_suplente= ?;`,
  getHorariosActividad: `select id_dia, id_horario from actividad_dia_horario where id_actividad = ?`,
  getTraslapes: `select DISTINCT(actividad.id) from actividad, socio_actividad, actividad_dia_horario where actividad_dia_horario.id_actividad = actividad.id and actividad.id = socio_actividad.id_actividad and socio_actividad.id_socio = ? and actividad_dia_horario.id_dia in (?) and actividad_dia_horario.id_horario in (?)`,
  getTraslapesInstructores: `select DISTINCT(actividad.id) from actividad, actividad_dia_horario where actividad_dia_horario.id_actividad = actividad.id and (actividad.id_instructor = ? or actividad.id_suplente = ?) and actividad_dia_horario.id_dia in (?) and actividad_dia_horario.id_horario in (?)`,
  getAllPopulatedActivities: `select  actividad.*, tipo_actividad.nombre as Actividad, instructor.nombre as Instructor, suplente.nombre as Suplente,(select GROUP_CONCAT(dia.nombre, ' ' ,horario.hora_inicio,' - ' , horario.hora_final)from horario, actividad_dia_horario, dia where   actividad.id=actividad_dia_horario.id_actividad and actividad_dia_horario.id_horario = horario.id_horario       and actividad_dia_horario.id_dia = dia.id ) as horario from actividad inner join tipo_actividad on tipo_actividad.id_tipo = actividad.id_tipo inner join persona as instructor on actividad.id_instructor = instructor.id inner join persona as suplente on actividad.id_suplente = suplente.id`,
};

import { mysqlTable, varchar, text, int, timestamp, boolean, float, json, index, uniqueIndex, primaryKey } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

// Función auxiliar para crear columnas UUID
const uuid = () => varchar('id', { length: 36 }).default(sql`(UUID())`).notNull();

// Tabla de Marcas (Brands)
export const marcas = mysqlTable('marcas', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull().unique(),
  orden: int('orden').notNull(),
  descripcion: text('descripcion'),
  seo: varchar('seo', { length: 255 }).notNull(),
  imagen: varchar('imagen', { length: 255 }),
  estaActivo: boolean('esta_activo').notNull().default(true),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Envíos (Cargoes)
export const envios = mysqlTable('envios', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull().unique(),
  precio: float('precio').notNull(),
  precioAnterior: float('precio_anterior').notNull().default(0),
  enlace: varchar('enlace', { length: 255 }).notNull().unique(),
  orden: int('orden').notNull(),
  imagen: varchar('imagen', { length: 255 }),
  estaActivo: boolean('esta_activo').notNull().default(true),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Categorías (Categories)
export const categorias = mysqlTable('categorias', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  categoriaParentId: varchar('categoria_parent_id', { length: 36 }),
  orden: int('orden').notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull().unique(),
  descripcion: text('descripcion'),
  seo: varchar('seo', { length: 255 }).notNull(),
  estaActivo: boolean('esta_activo').notNull().default(true),
  enlace: varchar('enlace', { length: 255 }),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Países (Country)
export const paises = mysqlTable('paises', {
  id: uuid(),
  codigo2: varchar('codigo2', { length: 2 }).notNull().unique(),
  codigo3: varchar('codigo3', { length: 3 }).notNull().unique(),
  nombre: varchar('nombre', { length: 255 }),
  capital: varchar('capital', { length: 255 }),
  region: varchar('region', { length: 255 }),
  subregion: varchar('subregion', { length: 255 }),
  estados: json('estados').$type<{ codigo: string, nombre: string, subdivision: string }[]>(),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Slider de Inicio (Homeslider)
export const sliderInicio = mysqlTable('slider_inicio', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  categoriaId: varchar('categoria_id', { length: 36 }),
  titulo: varchar('titulo', { length: 255 }),
  descripcion: text('descripcion'),
  enlace: varchar('enlace', { length: 255 }),
  orden: int('orden').notNull(),
  imagen: varchar('imagen', { length: 255 }),
  estaActivo: boolean('esta_activo').default(true),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Pedidos (Orders)
export const pedidos = mysqlTable('pedidos', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  clienteId: varchar('cliente_id', { length: 36 }),
  metodoPagoId: varchar('metodo_pago_id', { length: 36 }).notNull(),
  estadoPedidoId: varchar('estado_pedido_id', { length: 36 }).notNull(),
  envioId: varchar('envio_id', { length: 36 }),
  precioEnvio: float('precio_envio').notNull().default(0),
  descuentoPrecioEnvio: float('descuento_precio_envio').notNull().default(0),
  nombreReceptor: varchar('nombre_receptor', { length: 255 }).notNull(),
  emailReceptor: varchar('email_receptor', { length: 255 }).notNull(),
  telefonoReceptor: varchar('telefono_receptor', { length: 255 }).notNull(),
  numeroPedido: varchar('numero_pedido', { length: 255 }),
  intentoPago: varchar('intento_pago', { length: 255 }),
  precioTotal: float('precio_total').notNull().default(0),
  precioDescuento: float('precio_descuento').notNull().default(0),
  numeroEnvio: varchar('numero_envio', { length: 255 }),
  nota: text('nota'),
  direccionEnvio: text('direccion_envio').notNull(),
  direccionFacturacion: text('direccion_facturacion').notNull(),
  productos: json('productos').$type<{
    tipo: boolean,
    categoriaId: string,
    titulo: string,
    descripcion: string,
    seo: string,
    precio: number,
    precioAnterior: number,
    variantesSeleccionadas: Record<string, unknown>,
    cantidad: number,
    alto: number,
    ancho: number,
    largo: number
  }[]>(),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Estados de Pedido (Orderstatus)
export const estadosPedido = mysqlTable('estados_pedido', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull().unique(),
  orden: int('orden').notNull(),
  imagen: varchar('imagen', { length: 255 }),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Métodos de Pago (Paymentmethods)
export const metodosPago = mysqlTable('metodos_pago', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull().unique(),
  contrato: text('contrato'),
  estaActivo: boolean('esta_activo').notNull().default(true),
  orden: int('orden').notNull(),
  clavePublica: varchar('clave_publica', { length: 255 }),
  clavePrivada: varchar('clave_privada', { length: 255 }),
  api: json('api').$type<string[]>(),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Imágenes de Productos (Productimages)
export const imagenesProdutos = mysqlTable('imagenes_productos', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  estaActivo: boolean('esta_activo').notNull().default(true),
  productoId: varchar('producto_id', { length: 36 }).notNull(),
  titulo: varchar('titulo', { length: 255 }),
  orden: int('orden').notNull(),
  imagen: varchar('imagen', { length: 255 }).notNull(),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Productos (Products)
export const productos = mysqlTable('productos', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  estaActivo: boolean('esta_activo').notNull().default(true),
  tipo: boolean('tipo').notNull().default(false),
  categoriaId: varchar('categoria_id', { length: 36 }),
  marcaId: varchar('marca_id', { length: 36 }),
  codigo: varchar('codigo', { length: 255 }),
  titulo: varchar('titulo', { length: 255 }).notNull().unique(),
  descripcionCorta: text('descripcion_corta'),
  descripcion: text('descripcion'),
  seo: varchar('seo', { length: 255 }).notNull(),
  orden: int('orden').notNull(),
  precio: float('precio').notNull().default(0),
  precioAnterior: float('precio_anterior').notNull().default(0),
  variantes: json('variantes').$type<unknown[]>(),
  productosVariantes: json('productos_variantes').$type<unknown[]>(),
  alto: float('alto'),
  ancho: float('ancho'),
  largo: float('largo'),
  cantidad: int('cantidad').notNull().default(0),
  cantidadVendida: int('cantidad_vendida').notNull().default(0),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
  tituloIdx: index('titulo_idx').on(table.titulo),
}));

// Tabla de Configuraciones (Settings)
export const configuraciones = mysqlTable('configuraciones', {
  id: uuid(),
  empresa: varchar('empresa', { length: 255 }).notNull(),
  numeroFiscal: varchar('numero_fiscal', { length: 255 }).notNull(),
  centroFiscal: varchar('centro_fiscal', { length: 255 }).notNull(),
  iconoPrecio: varchar('icono_precio', { length: 255 }).notNull(),
  tipoPrecio: boolean('tipo_precio').notNull(),
  direcciones: json('direcciones').$type<{ nombre: string, valor: string }[]>(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  descripcion: text('descripcion').notNull(),
  palabrasClave: text('palabras_clave').notNull(),
  sitioWeb: varchar('sitio_web', { length: 255 }).notNull(),
  usuariosEmpresa: json('usuarios_empresa').$type<{ nombre: string, email: string, telefono: string }[]>(),
  emails: json('emails').$type<{ nombre: string, valor: string }[]>(),
  telefonos: json('telefonos').$type<{ nombre: string, valor: string }[]>(),
  datosAdicionales: json('datos_adicionales').$type<{ nombre: string, valor: string }[]>(),
  imagen: varchar('imagen', { length: 255 }),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Menú Superior (Topmenu)
export const menuSuperior = mysqlTable('menu_superior', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  categoriaId: varchar('categoria_id', { length: 36 }),
  orden: int('orden').notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull().unique(),
  descripcion: text('descripcion'),
  descripcionCorta: text('descripcion_corta'),
  seo: varchar('seo', { length: 255 }).notNull(),
  estaActivo: boolean('esta_activo').notNull().default(true),
  enlace: varchar('enlace', { length: 255 }),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Turquía (Turkey)
export const turquia = mysqlTable('turquia', {
  id: uuid(),
  provincia: varchar('provincia', { length: 255 }).notNull().unique(),
  distritos: json('distritos').$type<string[]>().notNull(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Usuarios (Users)
export const usuarios = mysqlTable('usuarios', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  estaActivo: boolean('esta_activo').notNull().default(true),
  esCliente: boolean('es_cliente').notNull().default(true),
  nombre: varchar('nombre', { length: 255 }),
  apellido: varchar('apellido', { length: 255 }),
  nombreUsuario: varchar('nombre_usuario', { length: 255 }).notNull().unique(),
  contrasena: varchar('contrasena', { length: 255 }).notNull(),
  rol: json('rol').$type<Record<string, boolean>>(),
  imagen: varchar('imagen', { length: 255 }),
  empresa: varchar('empresa', {
length: 255 }),
  oficinaTributaria: varchar('oficina_tributaria', { length: 255 }),
  numeroFiscal: varchar('numero_fiscal', { length: 255 }),
  nss: varchar('nss', { length: 255 }),
  ejecutivo: varchar('ejecutivo', { length: 255 }),
  telefono: varchar('telefono', { length: 255 }),
  prefijo: varchar('prefijo', { length: 255 }),
  fax: varchar('fax', { length: 255 }),
  web: varchar('web', { length: 255 }),
  riesgo: int('riesgo'),
  direcciones: json('direcciones').$type<{
    tipo: boolean,
    nombre: string,
    paisId: string,
    estadoId: string,
    ciudadId: string,
    municipioId: string,
    distritoId: string,
    puebloId: string,
    direccion: string
  }[]>(),
  idEspecifico: varchar('id_especifico', { length: 255 }),
  tokenRestablecerContrasena: varchar('token_restablecer_contrasena', { length: 255 }).default('asdasdasdas--example--6yhjkoıu7654esxcvbhythbvfde45ty'),
  expiracionRestablecerContrasena: timestamp('expiracion_restablecer_contrasena').defaultNow(),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
  nombreUsuarioIdx: uniqueIndex('nombre_usuario_idx').on(table.nombreUsuario),
}));

// Tabla de Variantes (Variants)
export const variantes = mysqlTable('variantes', {
  id: uuid(),
  usuarioCreador: json('usuario_creador').notNull(),
  nombre: varchar('nombre', { length: 255 }).notNull().unique(),
  descripcion: text('descripcion'),
  variantes: json('variantes').$type<unknown[]>().notNull(),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de Roles (nueva tabla para manejar roles de usuario)
export const roles = mysqlTable('roles', {
  id: uuid(),
  nombre: varchar('nombre', { length: 255 }).notNull().unique(),
  permisos: json('permisos').$type<Record<string, boolean>>().notNull(),
  creadoEn: timestamp('creado_en').defaultNow(),
  actualizadoEn: timestamp('actualizado_en').defaultNow().onUpdateNow(),
}, (table) => ({
  pk: primaryKey(table.id),
}));

// Tabla de relación Usuario-Rol (para manejar múltiples roles por usuario)
export const usuariosRoles = mysqlTable('usuarios_roles', {
  id: uuid(),
  usuarioId: varchar('usuario_id', { length: 36 }).notNull(),
  rolId: varchar('rol_id', { length: 36 }).notNull(),
  creadoEn: timestamp('creado_en').defaultNow(),
}, (table) => ({
  pk: primaryKey(table.id),
  usuarioRolIdx: uniqueIndex('usuario_rol_idx').on(table.usuarioId, table.rolId),
}));

// Relaciones

export const marcasRelations = relations(marcas, ({ many }) => ({
  productos: many(productos),
}));

export const enviosRelations = relations(envios, ({ many }) => ({
  pedidos: many(pedidos),
}));

export const categoriasRelations = relations(categorias, ({ one, many }) => ({
  categoriaParent: one(categorias, {
    fields: [categorias.categoriaParentId],
    references: [categorias.id],
  }),
  subcategorias: many(categorias),
  productos: many(productos),
  sliderInicio: many(sliderInicio),
  menuSuperior: many(menuSuperior),
}));

export const paisesRelations = relations(paises, ({ many }) => ({
  usuarios: many(usuarios),
}));

export const sliderInicioRelations = relations(sliderInicio, ({ one }) => ({
  categoria: one(categorias, {
    fields: [sliderInicio.categoriaId],
    references: [categorias.id],
  }),
}));

export const pedidosRelations = relations(pedidos, ({ one }) => ({
  cliente: one(usuarios, {
    fields: [pedidos.clienteId],
    references: [usuarios.id],
  }),
  metodoPago: one(metodosPago, {
    fields: [pedidos.metodoPagoId],
    references: [metodosPago.id],
  }),
  estadoPedido: one(estadosPedido, {
    fields: [pedidos.estadoPedidoId],
    references: [estadosPedido.id],
  }),
  envio: one(envios, {
    fields: [pedidos.envioId],
    references: [envios.id],
  }),
}));

export const estadosPedidoRelations = relations(estadosPedido, ({ many }) => ({
  pedidos: many(pedidos),
}));

export const metodosPagoRelations = relations(metodosPago, ({ many }) => ({
  pedidos: many(pedidos),
}));

export const imagenesProductosRelations = relations(imagenesProdutos, ({ one }) => ({
  producto: one(productos, {
    fields: [imagenesProdutos.productoId],
    references: [productos.id],
  }),
}));

export const productosRelations = relations(productos, ({ one, many }) => ({
  categoria: one(categorias, {
    fields: [productos.categoriaId],
    references: [categorias.id],
  }),
  marca: one(marcas, {
    fields: [productos.marcaId],
    references: [marcas.id],
  }),
  imagenes: many(imagenesProdutos),
}));

export const menuSuperiorRelations = relations(menuSuperior, ({ one }) => ({
  categoria: one(categorias, {
    fields: [menuSuperior.categoriaId],
    references: [categorias.id],
  }),
}));

export const usuariosRelations = relations(usuarios, ({ many }) => ({
  pedidos: many(pedidos),
  usuariosRoles: many(usuariosRoles),
}));

export const variantesRelations = relations(variantes, ({ many }) => ({
  productos: many(productos),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  usuariosRoles: many(usuariosRoles),
}));

export const usuariosRolesRelations = relations(usuariosRoles, ({ one }) => ({
  usuario: one(usuarios, {
    fields: [usuariosRoles.usuarioId],
    references: [usuarios.id],
  }),
  rol: one(roles, {
    fields: [usuariosRoles.rolId],
    references: [roles.id],
  }),
}));


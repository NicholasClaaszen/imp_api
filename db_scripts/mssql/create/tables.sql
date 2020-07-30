create table category
(
	id uniqueidentifier not null
		constraint PK_category
			primary key,
	name varchar(150) not null,
	icon varchar(max),
	active bit not null
)
go

create table contact
(
	id uniqueidentifier not null
		constraint PK_contact
			primary key,
	name varchar(150),
	email varchar(150),
	phone varchar(15),
	organisation_id uniqueidentifier
)
go

create table organisation
(
	id uniqueidentifier not null
		constraint PK_organisation
			primary key,
	name varchar(150) not null,
	is_default bit not null,
	contact_id uniqueidentifier
		constraint FK_organisation_contact
			references contact,
	base_url varchar(250)
)
go

alter table contact
	add constraint FK_contact_organisation
		foreign key (organisation_id) references organisation
go

create table event_series
(
	id uniqueidentifier not null
		constraint PK_event_series
			primary key,
	organisation_id uniqueidentifier not null
		constraint FK_event_series_organisation
			references organisation,
	name varchar(150) not null,
	active bit not null,
	contact_id uniqueidentifier
		constraint FK_event_series_contact
			references contact
)
go

create table event
(
	id uniqueidentifier not null
		constraint PK_event
			primary key,
	event_series_id uniqueidentifier not null
		constraint FK_event_event_series
			references event_series,
	name varchar(150) not null,
	startdate date not null,
	enddate date not null
)
go

create table kit
(
	id uniqueidentifier not null
		constraint PK_kit
			primary key,
	event_series_id uniqueidentifier not null
		constraint FK_kit_event_series
			references event_series,
	name varchar(150) not null,
	active bit not null
)
go

create table properties
(
	id uniqueidentifier not null
		constraint PK_properties
			primary key,
	category_id uniqueidentifier not null
		constraint FK_properties_category
			references category,
	name varchar(150) not null,
	property_type varchar(150) not null,
	active bit not null,
	drift int not null
)
go

create table property_options
(
	id uniqueidentifier not null
		constraint PK_property_options
			primary key,
	properties_id uniqueidentifier not null
		constraint FK_property_options_properties
			references properties,
	name varchar(150) not null,
	position int not null
)
go

create table settings
(
	[key] varchar(500) not null
		constraint PK_settings
			primary key,
	val varchar(500)
)
go

create table storage_location
(
	id uniqueidentifier not null
		constraint PK_storage_location
			primary key,
	organisation_id uniqueidentifier not null
		constraint FK_storage_location_organisation
			references organisation,
	name varchar(150) not null,
	address varchar(500),
	contact_id uniqueidentifier
		constraint FK_storage_location_contact
			references contact,
	active bit not null
)
go

create table storage_container
(
	id uniqueidentifier not null
		constraint PK_storage_container
			primary key,
	storage_location_id uniqueidentifier
		constraint FK_storage_container_storage_location
			references storage_location,
	organisation_id uniqueidentifier not null
		constraint FK_storage_container_organisation
			references organisation,
	name varchar(150) not null,
	description varchar(2000),
	active bit not null
)
go

create table item
(
	id uniqueidentifier not null
		constraint PK_item
			primary key,
	storage_container_id uniqueidentifier not null
		constraint FK_item_storage_container
			references storage_container,
	category_id uniqueidentifier not null
		constraint FK_item_category
			references category,
	name varchar(150) not null,
	active bit not null,
	dirty bit not null,
	broken bit not null,
	in_use bit not null,
	tag_number varchar(150),
	image_url varchar(250)
)
go

create index IX_tag
	on item (tag_number)
go

create table item_property_options
(
	id uniqueidentifier not null
		constraint PK_item_property_options
			primary key,
	item_id uniqueidentifier not null
		constraint FK_item_property_options_item
			references item,
	property_option_id uniqueidentifier
		constraint FK_item_property_options_property_options
			references property_options,
	free_text varchar(2000)
)
go

create table kit_item
(
	id uniqueidentifier not null
		constraint PK_kit_item
			primary key,
	item_id uniqueidentifier not null
		constraint FK_kit_item_item
			references item,
	kit_id uniqueidentifier not null
		constraint FK_kit_item_kit
			references kit
)
go

create table sysdiagrams
(
	name sysname not null,
	principal_id int not null,
	diagram_id int identity
		primary key,
	version int,
	definition varbinary(max),
	constraint UK_principal_name
		unique (principal_id, name)
)
go

create table users
(
	id uniqueidentifier not null
		constraint PK_users
			primary key,
	name varchar(150) not null,
	email varchar(150) not null,
	password varchar(250) not null,
	regdate datetime not null,
	lastlogindate datetime,
	active bit not null
)
go

create table users_rights
(
	id uniqueidentifier not null
		constraint PK_users_rights
			primary key,
	users_id uniqueidentifier not null
		constraint FK_users_rights_users
			references users,
	event_series_id uniqueidentifier
		constraint FK_users_rights_event_series
			references event_series,
	code varchar(50) not null
)
go

create table users_session
(
	id uniqueidentifier not null
		constraint PK_users_session
			primary key,
	users_id uniqueidentifier not null
		constraint FK_users_session_users
			references users,
	starttime datetime not null,
	active bit not null
)
go


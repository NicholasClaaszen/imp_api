USE [master]
GO

/****** Object:  Database [prod_imp]    Script Date: 26-8-2020 15:46:14 ******/
CREATE DATABASE [prod_imp]
 CONTAINMENT = NONE
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [prod_imp].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [prod_imp] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [prod_imp] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [prod_imp] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [prod_imp] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [prod_imp] SET ARITHABORT OFF 
GO

ALTER DATABASE [prod_imp] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [prod_imp] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [prod_imp] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [prod_imp] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [prod_imp] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [prod_imp] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [prod_imp] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [prod_imp] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [prod_imp] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [prod_imp] SET  DISABLE_BROKER 
GO

ALTER DATABASE [prod_imp] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [prod_imp] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [prod_imp] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [prod_imp] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [prod_imp] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [prod_imp] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [prod_imp] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [prod_imp] SET RECOVERY FULL 
GO

ALTER DATABASE [prod_imp] SET  MULTI_USER 
GO

ALTER DATABASE [prod_imp] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [prod_imp] SET DB_CHAINING OFF 
GO

ALTER DATABASE [prod_imp] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [prod_imp] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [prod_imp] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [prod_imp] SET QUERY_STORE = OFF
GO

ALTER DATABASE [prod_imp] SET  READ_WRITE 
GO




USE [prod_imp]
GO
/****** Object:  Table [dbo].[category]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[icon] [varchar](max) NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_category] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contact]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contact](
	[id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NULL,
	[email] [varchar](150) NULL,
	[phone] [varchar](15) NULL,
	[active] [bit] NOT NULL,
	[organisation_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_contact] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[event]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[event](
	[id] [uniqueidentifier] NOT NULL,
	[event_series_id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[startdate] [date] NOT NULL,
	[enddate] [date] NOT NULL,
 CONSTRAINT [PK_event] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[event_series]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[event_series](
	[id] [uniqueidentifier] NOT NULL,
	[organisation_id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[active] [bit] NOT NULL,
	[contact_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_event_series] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[item]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[item](
	[id] [uniqueidentifier] NOT NULL,
	[storage_container_id] [uniqueidentifier] NOT NULL,
	[category_id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[active] [bit] NOT NULL,
	[dirty] [bit] NOT NULL,
	[broken] [bit] NOT NULL,
	[in_use] [bit] NOT NULL,
	[tag_number] [varchar](150) NULL,
	[image_url] [varchar](250) NULL,
 CONSTRAINT [PK_item] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[item_property_options]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[item_property_options](
	[id] [uniqueidentifier] NOT NULL,
	[item_id] [uniqueidentifier] NOT NULL,
	[property_id] [uniqueidentifier] NOT NULL,
	[property_option_id] [uniqueidentifier] NULL,
	[free_text] [varchar](2000) NULL,
 CONSTRAINT [PK_item_property_options] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[kit]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[kit](
	[id] [uniqueidentifier] NOT NULL,
	[event_series_id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_kit] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[kit_item]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[kit_item](
	[id] [uniqueidentifier] NOT NULL,
	[item_id] [uniqueidentifier] NOT NULL,
	[kit_id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_kit_item] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[logging]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[logging](
	[id] [uniqueidentifier] NOT NULL,
	[source] [varchar](50) NOT NULL,
	[moment] [datetime] NOT NULL,
	[query] [varchar](max) NOT NULL,
	[body] [varchar](max) NULL,
	[users_id] [varchar](50) NULL,
	[url] [varchar](500) NULL,
 CONSTRAINT [PK_logging] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[organisation]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[organisation](
	[id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[is_default] [bit] NOT NULL,
	[contact_id] [uniqueidentifier] NULL,
	[base_url] [varchar](250) NULL,
 CONSTRAINT [PK_organisation] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[properties]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[properties](
	[id] [uniqueidentifier] NOT NULL,
	[category_id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[property_type] [varchar](150) NOT NULL,
	[active] [bit] NOT NULL,
	[drift] [int] NOT NULL,
 CONSTRAINT [PK_properties] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[property_options]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[property_options](
	[id] [uniqueidentifier] NOT NULL,
	[properties_id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[position] [int] NOT NULL,
 CONSTRAINT [PK_property_options] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[settings]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[settings](
	[key] [varchar](500) NOT NULL,
	[val] [varchar](500) NULL,
 CONSTRAINT [PK_settings] PRIMARY KEY CLUSTERED 
(
	[key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[storage_container]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[storage_container](
	[id] [uniqueidentifier] NOT NULL,
	[storage_location_id] [uniqueidentifier] NULL,
	[organisation_id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[description] [varchar](2000) NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_storage_container] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[storage_location]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[storage_location](
	[id] [uniqueidentifier] NOT NULL,
	[organisation_id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[address] [varchar](500) NULL,
	[contact_id] [uniqueidentifier] NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_storage_location] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [uniqueidentifier] NOT NULL,
	[name] [varchar](150) NOT NULL,
	[email] [varchar](150) NOT NULL,
	[password] [varchar](250) NOT NULL,
	[regdate] [datetime] NOT NULL,
	[lastlogindate] [datetime] NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users_rights]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users_rights](
	[id] [uniqueidentifier] NOT NULL,
	[users_id] [uniqueidentifier] NOT NULL,
	[event_series_id] [uniqueidentifier] NULL,
	[code] [varchar](50) NOT NULL,
 CONSTRAINT [PK_users_rights] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users_session]    Script Date: 26-8-2020 15:45:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users_session](
	[id] [uniqueidentifier] NOT NULL,
	[users_id] [uniqueidentifier] NOT NULL,
	[starttime] [datetime] NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_users_session] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[contact] ADD  CONSTRAINT [DF_contact_active]  DEFAULT ((1)) FOR [active]
GO
ALTER TABLE [dbo].[contact]  WITH NOCHECK ADD  CONSTRAINT [FK_contact_organisation] FOREIGN KEY([organisation_id])
REFERENCES [dbo].[organisation] ([id])
NOT FOR REPLICATION 
GO
ALTER TABLE [dbo].[contact] CHECK CONSTRAINT [FK_contact_organisation]
GO
ALTER TABLE [dbo].[event]  WITH CHECK ADD  CONSTRAINT [FK_event_event_series] FOREIGN KEY([event_series_id])
REFERENCES [dbo].[event_series] ([id])
GO
ALTER TABLE [dbo].[event] CHECK CONSTRAINT [FK_event_event_series]
GO
ALTER TABLE [dbo].[event_series]  WITH CHECK ADD  CONSTRAINT [FK_event_series_contact] FOREIGN KEY([contact_id])
REFERENCES [dbo].[contact] ([id])
GO
ALTER TABLE [dbo].[event_series] CHECK CONSTRAINT [FK_event_series_contact]
GO
ALTER TABLE [dbo].[event_series]  WITH CHECK ADD  CONSTRAINT [FK_event_series_organisation] FOREIGN KEY([organisation_id])
REFERENCES [dbo].[organisation] ([id])
GO
ALTER TABLE [dbo].[event_series] CHECK CONSTRAINT [FK_event_series_organisation]
GO
ALTER TABLE [dbo].[item]  WITH CHECK ADD  CONSTRAINT [FK_item_category] FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([id])
GO
ALTER TABLE [dbo].[item] CHECK CONSTRAINT [FK_item_category]
GO
ALTER TABLE [dbo].[item]  WITH CHECK ADD  CONSTRAINT [FK_item_storage_container] FOREIGN KEY([storage_container_id])
REFERENCES [dbo].[storage_container] ([id])
GO
ALTER TABLE [dbo].[item] CHECK CONSTRAINT [FK_item_storage_container]
GO
ALTER TABLE [dbo].[item_property_options]  WITH CHECK ADD  CONSTRAINT [FK_item_property_options_item] FOREIGN KEY([item_id])
REFERENCES [dbo].[item] ([id])
GO
ALTER TABLE [dbo].[item_property_options] CHECK CONSTRAINT [FK_item_property_options_item]
GO
ALTER TABLE [dbo].[item_property_options]  WITH CHECK ADD  CONSTRAINT [FK_item_property_options_properties] FOREIGN KEY([property_id])
REFERENCES [dbo].[properties] ([id])
GO
ALTER TABLE [dbo].[item_property_options] CHECK CONSTRAINT [FK_item_property_options_properties]
GO
ALTER TABLE [dbo].[item_property_options]  WITH CHECK ADD  CONSTRAINT [FK_item_property_options_property_options] FOREIGN KEY([property_option_id])
REFERENCES [dbo].[property_options] ([id])
GO
ALTER TABLE [dbo].[item_property_options] CHECK CONSTRAINT [FK_item_property_options_property_options]
GO
ALTER TABLE [dbo].[kit]  WITH CHECK ADD  CONSTRAINT [FK_kit_event_series] FOREIGN KEY([event_series_id])
REFERENCES [dbo].[event_series] ([id])
GO
ALTER TABLE [dbo].[kit] CHECK CONSTRAINT [FK_kit_event_series]
GO
ALTER TABLE [dbo].[kit_item]  WITH CHECK ADD  CONSTRAINT [FK_kit_item_item] FOREIGN KEY([item_id])
REFERENCES [dbo].[item] ([id])
GO
ALTER TABLE [dbo].[kit_item] CHECK CONSTRAINT [FK_kit_item_item]
GO
ALTER TABLE [dbo].[kit_item]  WITH CHECK ADD  CONSTRAINT [FK_kit_item_kit] FOREIGN KEY([kit_id])
REFERENCES [dbo].[kit] ([id])
GO
ALTER TABLE [dbo].[kit_item] CHECK CONSTRAINT [FK_kit_item_kit]
GO
ALTER TABLE [dbo].[organisation]  WITH CHECK ADD  CONSTRAINT [FK_organisation_contact] FOREIGN KEY([contact_id])
REFERENCES [dbo].[contact] ([id])
GO
ALTER TABLE [dbo].[organisation] CHECK CONSTRAINT [FK_organisation_contact]
GO
ALTER TABLE [dbo].[properties]  WITH CHECK ADD  CONSTRAINT [FK_properties_category] FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([id])
GO
ALTER TABLE [dbo].[properties] CHECK CONSTRAINT [FK_properties_category]
GO
ALTER TABLE [dbo].[property_options]  WITH CHECK ADD  CONSTRAINT [FK_property_options_properties] FOREIGN KEY([properties_id])
REFERENCES [dbo].[properties] ([id])
GO
ALTER TABLE [dbo].[property_options] CHECK CONSTRAINT [FK_property_options_properties]
GO
ALTER TABLE [dbo].[storage_container]  WITH CHECK ADD  CONSTRAINT [FK_storage_container_organisation] FOREIGN KEY([organisation_id])
REFERENCES [dbo].[organisation] ([id])
GO
ALTER TABLE [dbo].[storage_container] CHECK CONSTRAINT [FK_storage_container_organisation]
GO
ALTER TABLE [dbo].[storage_container]  WITH CHECK ADD  CONSTRAINT [FK_storage_container_storage_location] FOREIGN KEY([storage_location_id])
REFERENCES [dbo].[storage_location] ([id])
GO
ALTER TABLE [dbo].[storage_container] CHECK CONSTRAINT [FK_storage_container_storage_location]
GO
ALTER TABLE [dbo].[storage_location]  WITH CHECK ADD  CONSTRAINT [FK_storage_location_contact] FOREIGN KEY([contact_id])
REFERENCES [dbo].[contact] ([id])
GO
ALTER TABLE [dbo].[storage_location] CHECK CONSTRAINT [FK_storage_location_contact]
GO
ALTER TABLE [dbo].[storage_location]  WITH CHECK ADD  CONSTRAINT [FK_storage_location_organisation] FOREIGN KEY([organisation_id])
REFERENCES [dbo].[organisation] ([id])
GO
ALTER TABLE [dbo].[storage_location] CHECK CONSTRAINT [FK_storage_location_organisation]
GO
ALTER TABLE [dbo].[users_rights]  WITH CHECK ADD  CONSTRAINT [FK_users_rights_event_series] FOREIGN KEY([event_series_id])
REFERENCES [dbo].[event_series] ([id])
GO
ALTER TABLE [dbo].[users_rights] CHECK CONSTRAINT [FK_users_rights_event_series]
GO
ALTER TABLE [dbo].[users_rights]  WITH CHECK ADD  CONSTRAINT [FK_users_rights_users] FOREIGN KEY([users_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[users_rights] CHECK CONSTRAINT [FK_users_rights_users]
GO
ALTER TABLE [dbo].[users_session]  WITH CHECK ADD  CONSTRAINT [FK_users_session_users] FOREIGN KEY([users_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[users_session] CHECK CONSTRAINT [FK_users_session_users]
GO


class ExeFile
{
	constructor(filePath)
	{
		this.filePath = filePath;
	}

	static BitsPerByte = 8;

	// static methods

	static fromFilePathAndBytes(filePath, bytesFromFile)
	{
		var reader = new ByteStream(bytesFromFile);

		var returnValue = new ExeFile(filePath);
		returnValue.readFromFilePath_ReadAll(reader);

		return returnValue;
	}

	readFromFilePath_ReadAll(reader)
	{
		// File specification obtained from www.oldschoolhack.de

		this.readFromFilePath_ReadMZSection(reader);
		this.readFromFilePath_ReadPESectionHeader(reader);
		this.readFromFilePath_ReadOptionalHeader(reader);
		this.readFromFilePath_ReadVirtualAddresses(reader);
		this.readFromFilePath_ReadSectionHeaders(reader);
	}

	readFromFilePath_ReadMZSection(reader)
	{
		// MZ section (an MS-DOS program, usually a "stub").
		// "MZ" are reportedly the initials of an early MS-DOS developer.

		var mzString = reader.readString(2); // 0x00
		var numberOfBytesOnLastPageOfFile = reader.readShortLE(); // 0x02
		var numberOfPagesInFile = reader.readShortLE(); // 0x04
		var relocations = reader.readShortLE(); // 0x06
		var sizeOfHeaderInParagraphs = reader.readShortLE(); // 0x08
		var minimumExtraParagraphsNeeded = reader.readShortLE(); // 0x0A
		var maximumExtraParagraphsNeeded = reader.readShortLE(); // 0x0C
		var initialRelativeSSValue = reader.readShortLE(); // 0x0E
		var initialSPValue = reader.readShortLE(); // 0x10
		var checksum = reader.readShortLE(); // 0x12
		var initialIPValue = reader.readShortLE(); // 0x14
		var initialRelativeCSValue = reader.readShortLE(); // 0x16
		var fileAddressOfRelocationTable = reader.readShortLE(); // 0x18
		var overlayNumber = reader.readShortLE(); // 0x1A
		var reserved0 = reader.readBytesAsHexadecimal(8); // 0x1C
		var oemIdentifier = reader.readShortLE(); // 0x24
		var oemInformation = reader.readShortLE(); // 0x26
		var reserved1 = reader.readBytesAsHexadecimal(20); // 0x28
		var addressOfPEHeader = reader.readIntLE(); // 0x3C

		var sizeOfMZSectionHeaderInBytes = 64;
		var numberOfBytesInMZSectionBody = addressOfPEHeader - sizeOfMZSectionHeaderInBytes;
		var bodyBytesAsHexadecimal =
			reader.readBytesAsHexadecimal(numberOfBytesInMZSectionBody);

		this.mzSection = new MZSection
		(
			mzString,
			numberOfBytesOnLastPageOfFile,
			numberOfPagesInFile,
			relocations,
			sizeOfHeaderInParagraphs,
			minimumExtraParagraphsNeeded,
			maximumExtraParagraphsNeeded,
			initialRelativeSSValue,
			initialSPValue,
			checksum,
			initialIPValue,
			initialRelativeCSValue,
			fileAddressOfRelocationTable,
			overlayNumber,
			reserved0,
			oemIdentifier,
			oemInformation,
			reserved1,
			addressOfPEHeader,
			bodyBytesAsHexadecimal
		);
	}

	readFromFilePath_ReadPESectionHeader(reader)
	{
		// PE ("Portable Executable") section header.
		// Notes and recognized field values taken from:
		// "https://learn.microsoft.com/en-us/windows/win32/debug/pe-format"

		var peString = reader.readString(4);

		var machine = reader.readShortLE();
		// Recognized machine types are listed below.
		// 
		// Type 		Code 	Decimal 	Description
		// ---- 		---- 	------- 	-----------
		// UNKNOWN 		0x0 	0			The content of this field is assumed to be applicable to any machine type
		// ALPHA 		0x184 				Alpha AXP, 32-bit address space
		// ALPHA64 		0x284 				Alpha 64, 64-bit address space
		// AM33 		0x1d3 				Matsushita AM33
		// AMD64 		0x8664 	34404		x64
		// ARM 			0x1c0 				ARM little endian
		// ARM64 		0xaa64 				ARM64 little endian
		// ARMNT 		0x1c4 				ARM Thumb-2 little endian
		// AXP64 		0x284 				AXP 64 (Same as Alpha 64)
		// EBC 			0xebc 				EFI byte code
		// I386 		0x14c 				Intel 386 or later processors and compatible processors
		// IA64 		0x200 				Intel Itanium processor family
		// LOONGARCH32 	0x6232 				LoongArch 32-bit processor family
		// LOONGARCH64 	0x6264 				LoongArch 64-bit processor family
		// M32R 		0x9041 				Mitsubishi M32R little endian
		// MIPS16 		0x266 				MIPS16
		// MIPSFPU		0x366 				MIPS with FPU
		// MIPSFPU16 	0x466 				MIPS16 with FPU 
		// POWERPC 		0x1f0 				Power PC little endian
		// POWERPCFP 	0x1f1 				Power PC with floating point support
		// R4000 		0x166 				MIPS little endian
		// RISCV32 		0x5032 				RISC-V 32-bit address space
		// RISCV64 		0x5064 				RISC-V 64-bit address space
		// RISCV128 	0x5128 				RISC-V 128-bit address space
		// SH3 			0x1a2 				Hitachi SH3
		// SH3DSP 		0x1a3 				Hitachi SH3 DSP
		// SH4 			0x1a6 				Hitachi SH4
		// SH5 			0x1a8 				Hitachi SH5
		// THUMB 		0x1c2 				Thumb
		// WCEMIPSV2 	0x169 				MIPS little-endian WCE v2

		var numberOfSections = reader.readShortLE();

		// These values sometimes seem nonsensical, in, say, notepad.exe from Windows 10.
		var timeCreatedInSecondsSince1969 = reader.readIntLE();

		// "File offset of COFF [(Common Engine File Format)] symbol table, or zero if [none]."
		var pointerToSymbolTable = reader.readIntLE();

		// "Number of entries in symbol table."
		// "...can be used to locate the string table, which immediately follows the symbol table."
		var numberOfSymbols = reader.readIntLE(); 

		// "...required for executable files but not for object files."
		var sizeOfOptionalHeader = reader.readShortLE(); 

		var characteristicsAsShort = reader.readShortLE();
		var characteristics =
			PeSectionHeaderCharacteristics.fromShort(characteristicsAsShort);

		this.peSectionHeader = new PESectionHeader
		(
			peString,
			machine,
			numberOfSections,
			timeCreatedInSecondsSince1969,
			pointerToSymbolTable,
			numberOfSymbols,
			sizeOfOptionalHeader,
			characteristics
		);
	}

	readFromFilePath_ReadOptionalHeader(reader)
	{
		// Standard fields.
		var executableType = reader.readShortLE(); // At offset 0x18.  AKA "magic number."  Values: 0x10B (267) = "PE32", 0x20B (523) = "PE32+"

		var majorLinkerVersion = reader.readByte(); // 0x1A
		var minorLinkerVersion = reader.readByte(); // 0x1B
		var sizeOfCode = reader.readIntLE(); // 0x1C
		var sizeOfInitializedData = reader.readIntLE(); // 0x20
		var sizeOfUninitializedData = reader.readIntLE(); // 0x24
		var addressOfEntryPoint = reader.readIntLE(); // 0x28. "[...] relative to the image base when [...] loaded into memory[, or 0 if none]."
		var baseOfCode = reader.readIntLE(); // 0x2C

		var sizeOfVariableFieldsForExecutableType;

		if (executableType == 0x18) // PE-32
		{
			// hack - Exists in PE32 only, not PE32+.
			var baseOfData = reader.readIntLE(); // 0x30
			sizeOfVariableFieldsForExecutableType = 4;
		}
		else // PE-32+
		{
			sizeOfVariableFieldsForExecutableType = 8;
		}

		// Windows-specific fields.

		// "[...] preferred address of the first byte of image [...];
		// must be a multiple of 64 K."
		// Most versions of Windows default to 0x00400000.
		// This is 8 bytes rather than 4 in PE32+,
		// but since the preceding baseOfData field doesn't exist in PE-32,
		// the offsets of the next several fields stay the same.
		var imageBase =
			reader.readBytesAsHexadecimal(sizeOfVariableFieldsForExecutableType); // 0x34/0x30

		// In bytes.  "Must be greater than or equal FileAlignment."
		var sectionAlignment = reader.readIntLE(); // 0x38 

		// "should be a power of 2 between 512 and 64 K, inclusive. The default is 512."
		var fileAlignment = reader.readIntLE(); // 0x3C

		var majorOSVersion = reader.readShortLE(); // 0x40
		var minorOSVersion = reader.readShortLE(); // 0x42
		var majorImageVersion = reader.readShortLE(); // 0x44
		var minorImageVersion = reader.readShortLE(); // 0x46
		var majorSubsystemVersion = reader.readShortLE(); // 0x48
		var minorSubsystemVersion = reader.readShortLE(); // 0x4A
		var reserved = reader.readIntLE(); // 0x4C
		var sizeOfImage = reader.readIntLE(); // 0x50.  In bytes, including all headers.

		// Size of MS-DOS stub + PE header + section headers, rounded up to multiple of fileAlignment.
		var sizeOfHeaders = reader.readIntLE(); // 0x54

		var checksum = reader.readIntLE(); // 0x58 "The algorithm for computing the checksum is incorporated into IMAGHELP.DLL".

		var subsystem = reader.readShortLE(); // 0x5C
		// Recognized values are listed below.
		// Name 					Code 	Description
		// ---- 					----	-----------
		// UNKNOWN 					0 		An unknown subsystem
		// NATIVE 					1 		Device drivers and native Windows processes
		// WINDOWS_GUI 				2 		The Windows graphical user interface (GUI) subsystem
		// WINDOWS_CUI 				3 		The Windows character subsystem
		// OS2_CUI 					5 		The OS/2 character subsystem
		// POSIX_CUI 				7 		The Posix character subsystem
		// NATIVE_WINDOWS 			8 		Native Win9x driver
		// WINDOWS_CE_GUI 			9 		Windows CE
		// EFI_APPLICATION 			10 		An Extensible Firmware Interface (EFI) application
		// EFI_BOOT_SERVICE_DRIVER 	11 		An EFI driver with boot services
		// EFI_RUNTIME_ DRIVER 		12 		An EFI driver with run-time services
		// EFI_ROM 					13 		An EFI ROM image
		// XBOX 					14 		XBOX
		// WINDOWS_BOOT_APPLICATION 16 		Windows boot application.

		var dllCharacteristics =
			DllCharacteristics.fromShort(reader.readShortLE()); // 0x5E

		// This field is different sizes in PE32 versus 32+,
		// so the offsets are different after this.
		// hack - This code assumes PE32.
		var sizeOfStackReserve =
			reader.readBytesAsHexadecimal(sizeOfVariableFieldsForExecutableType); // 0x60

		var sizeOfStackCommit =
			reader.readBytesAsHexadecimal(sizeOfVariableFieldsForExecutableType); // 0x64/0x68

		var sizeOfHeapReserve =
			reader.readBytesAsHexadecimal(sizeOfVariableFieldsForExecutableType); // 0x68/?

		var sizeOfHeapCommit =
			reader.readBytesAsHexadecimal(sizeOfVariableFieldsForExecutableType); // 0x6C/?

		var loaderFlags = reader.readIntLE(); // 0x70/?.  "Reserved, must be zero."

		// "Data-directory entries in remainder of optional header."
		// "Each describes a location and size."
		var numberOfRVAAndSizes = reader.readIntLE(); // 0x74/?.  

		this.optionalHeader = new OptionalHeader
		(
			executableType,
			majorLinkerVersion,
			minorLinkerVersion,
			sizeOfCode,
			sizeOfInitializedData,
			sizeOfUninitializedData,
			addressOfEntryPoint,
			baseOfCode,
			baseOfData,

			imageBase,
			sectionAlignment,
			fileAlignment,
			majorOSVersion,
			minorOSVersion,
			majorImageVersion,
			minorImageVersion,
			majorSubsystemVersion,
			minorSubsystemVersion,
			reserved,
			sizeOfImage,
			sizeOfHeaders,
			checksum,
			subsystem,
			dllCharacteristics,
			sizeOfStackReserve,
			sizeOfStackCommit,
			sizeOfHeapReserve,
			sizeOfHeapCommit,
			loaderFlags,
			numberOfRVAAndSizes
		);
	}

	readFromFilePath_ReadVirtualAddresses(reader)
	{
		// IMAGE_DATA_DIRECTORY DataDirectory[IMAGE_NUMBEROF_DIRECTORY_ENTRIES];
		// IMAGE_NUMBEROF_DIRECTORY_ENTRIES = 16

		var vas = VirtualAddressAndSize;

		var exportDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var importDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var resourceDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var exceptionDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var securityDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var baseRelocationTable =
			new vas(reader.readIntLE(), reader.readIntLE());
		var debugDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var architectureSpecificData =
			new vas(reader.readIntLE(), reader.readIntLE());
		var rvaOfGP =
			new vas(reader.readIntLE(), reader.readIntLE());
		var tlsDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var loadConfigurationDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var boundImportDirectory =
			new vas(reader.readIntLE(), reader.readIntLE());
		var importAddressTable =
			new vas(reader.readIntLE(), reader.readIntLE());
		var delayLoadImportDescriptors =
			new vas(reader.readIntLE(), reader.readIntLE());
		var comRuntimeDescriptor =
			new vas(reader.readIntLE(), reader.readIntLE());
		var zeroes = reader.readBytesAsHexadecimal(8);

		this.virtualAddresses = new VirtualAddresses
		(
			exportDirectory,
			importDirectory,
			resourceDirectory,
			exceptionDirectory,
			securityDirectory,
			baseRelocationTable,
			debugDirectory,
			architectureSpecificData,
			rvaOfGP,
			tlsDirectory,
			loadConfigurationDirectory,
			boundImportDirectory,
			importAddressTable,
			delayLoadImportDescriptors,
			comRuntimeDescriptor,
			zeroes
		);
	}

	readFromFilePath_ReadSectionHeaders(reader)
	{
		var returnValues = [];

		for (var s = 0; s < this.peSectionHeader.numberOfSections; s++)
		{
			var ansiName = reader.readString(8); // 0x00
			var misc = reader.readIntLE(); // 0x08
			var virtualAddress = reader.readIntLE(); // 0x0C
			var sizeOfRawData = reader.readIntLE(); // 0x10
			var pointerToRawData = reader.readIntLE(); // 0x14
			var pointerToRelocations = reader.readIntLE(); // 0x18
			var pointerToLineNumbers = reader.readIntLE(); // 0x1C
			var numberOfRelocations = reader.readShortLE(); // 0x20
			var numberOfLineNumbers = reader.readShortLE(); // 0x22
			var characteristics =
				SectionFlags.fromBytes(reader.readBytes(4)); // 0x24

			var sectionHeader = new SectionHeader
			(
				ansiName,
				misc,
				virtualAddress,
				sizeOfRawData,
				pointerToRawData,
				pointerToRelocations,
				pointerToLineNumbers,
				numberOfRelocations,
				numberOfLineNumbers,
				characteristics
			);

			returnValues.push(sectionHeader);
		}

		this.sectionHeaders = returnValues;
	}
}
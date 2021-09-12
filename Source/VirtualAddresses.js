
class VirtualAddresses
{
	constructor
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
	)
	{
		this.exportDirectory = exportDirectory;
		this.importDirectory = importDirectory;
		this.resourceDirectory = resourceDirectory;
		this.exceptionDirectory = exceptionDirectory;
		this.securityDirectory = securityDirectory;
		this.baseRelocationTable = baseRelocationTable;
		this.debugDirectory = debugDirectory;
		this.architectureSpecificData = architectureSpecificData;
		this.rvaOfGP = rvaOfGP;
		this.tlsDirectory = tlsDirectory;
		this.loadConfigurationDirectory = loadConfigurationDirectory;
		this.boundImportDirectory = boundImportDirectory;
		this.importAddressTable = importAddressTable;
		this.delayLoadImportDescriptors = delayLoadImportDescriptors;
		this.comRuntimeDescriptor = comRuntimeDescriptor;
		this.zeroes = zeroes;

	}
}

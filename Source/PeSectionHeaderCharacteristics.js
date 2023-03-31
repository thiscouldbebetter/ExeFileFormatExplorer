
class PeSectionHeaderCharacteristics
{
	constructor
	(
		doesNotContainBaseRelocations, // RELOCS_STRIPPED.  If true, "must therefore be loaded at its preferred base address".
		isExecutableImage, // EXECUTABLE_IMAGE.  If not, a linker error has occurred.
		haveCoffLineNumbersBeenRemoved, // LINE_NUMS_STRIPPED.  Deprecated, should be zero.
		haveCoffSymbolEntriesBeenRemoved, // LOCAL_SYMS_STRIPPED.  Deprecated, should be zero.
		shouldAgressivelyTrimWorkingSet, // AGGRESSIVE_WS_TRIM.  Obsolete for Win 2000+, should be zero.
		canHandleAddressesGreaterThan2GiB, // LARGE_ADDRESS_AWARE.
		reserved,
		isLittleEndian, // BYTES_REVERSED_LO.  Deprecated, should be zero.
		is32BitMachine, // 32BIT_MACHINE.
		hasDebuggingInfoBeenRemoved, // DEBUG_STRIPPED.
		ifOnRemovableMediaLoadAndCopyToSwapFile, // REMOVABLE_RUN_FROM_SWAP.
		ifOnNetworkMediaLoadAndCopyToSwapFile, // NET_RUN_FROM_SWAP.
		shouldOnlyRunOnUniprocessorMachine, // UP_SYSTEM_ONLY.
		isBigEndian, // BYTES_REVERSED_HI.  Deprecated, should be zero.
	)
	{
		this.doesNotContainBaseRelocations = doesNotContainBaseRelocations;
		this.isExecutableImage = isExecutableImage;
		this.haveCoffLineNumbersBeenRemoved = haveCoffLineNumbersBeenRemoved;
		this.haveCoffSymbolEntriesBeenRemoved = haveCoffSymbolEntriesBeenRemoved;
		this.shouldAgressivelyTrimWorkingSet = shouldAgressivelyTrimWorkingSet;
		this.canHandleAddressesGreaterThan2GiB = canHandleAddressesGreaterThan2GiB;
		this.reserved = reserved;
		this.isLittleEndian = isLittleEndian;
		this.is32BitMachine = is32BitMachine;
		this.hasDebuggingInfoBeenRemoved = hasDebuggingInfoBeenRemoved;
		this.ifOnRemovableMediaLoadAndCopyToSwapFile = ifOnRemovableMediaLoadAndCopyToSwapFile;
		this.ifOnNetworkMediaLoadAndCopyToSwapFile = ifOnNetworkMediaLoadAndCopyToSwapFile;
		this.shouldOnlyRunOnUniprocessorMachine = shouldOnlyRunOnUniprocessorMachine;
		this.isBigEndian = isBigEndian;
	}

	static fromShort(shortToParse)
	{
		var doesNotContainBaseRelocations = (shortToParse >> 0) & 1;
		var isExecutableImage = (shortToParse >> 1) & 1;
		var haveCoffLineNumbersBeenRemoved = (shortToParse >> 2) & 1;
		var haveCoffSymbolEntriesBeenRemoved = (shortToParse >> 3) & 1;
		var shouldAgressivelyTrimWorkingSet = (shortToParse >> 4) & 1;
		var canHandleAddressesGreaterThan2GiB = (shortToParse >> 5) & 1;
		var reserved = (shortToParse >> 6) & 1;
		var isLittleEndian = (shortToParse >> 7) & 1;
		var is32BitMachine = (shortToParse >> 8) & 1;
		var hasDebuggingInfoBeenRemoved = (shortToParse >> 9) & 1;
		var ifOnRemovableMediaLoadAndCopyToSwapFile = (shortToParse >> 10) & 1;
		var ifOnNetworkMediaLoadAndCopyToSwapFile = (shortToParse >> 11) & 1;
		var shouldOnlyRunOnUniprocessorMachine = (shortToParse >> 12) & 1;
		var isBigEndian = (shortToParse >> 13) & 1;

		return new PeSectionHeaderCharacteristics
		(
			doesNotContainBaseRelocations, 
			isExecutableImage,
			haveCoffLineNumbersBeenRemoved,
			haveCoffSymbolEntriesBeenRemoved,
			shouldAgressivelyTrimWorkingSet,
			canHandleAddressesGreaterThan2GiB,
			reserved,
			isLittleEndian,
			is32BitMachine,
			hasDebuggingInfoBeenRemoved,
			ifOnRemovableMediaLoadAndCopyToSwapFile,
			ifOnNetworkMediaLoadAndCopyToSwapFile,
			shouldOnlyRunOnUniprocessorMachine,
			isBigEndian
		);
	}

	toShort()
	{
		var returnValue =
			(this.doesNotContainBaseRelocations << 0)
			| (this.isExecutableImage << 1)
			| (this.haveCoffLineNumbersBeenRemoved << 2) 
			| (this.haveCoffSymbolEntriesBeenRemoved << 3) 
			| (this.shouldAgressivelyTrimWorkingSet << 4) 
			| (this.canHandleAddressesGreaterThan2GiB << 5) 
			| (this.reserved << 6) 
			| (this.isLittleEndian << 7) 
			| (this.is32BitMachine << 8) 
			| (this.hasDebuggingInfoBeenRemoved << 9) 
			| (this.ifOnRemovableMediaLoadAndCopyToSwapFile << 10) 
			| (this.ifOnNetworkMediaLoadAndCopyToSwapFile << 11) 
			| (this.shouldOnlyRunOnUniprocessorMachine << 12) 
			| (this.isBigEndian << 13);

		return returnValue;
	}
}



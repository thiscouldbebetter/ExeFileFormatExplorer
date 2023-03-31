
class DllCharacteristics
{
	constructor
	(
		reserved0,
		reserved1,
		reserved2,
		reserved3,
		reserved4,
		canHandleHighEntropy64BitAddressSpace, // HIGH_ENTROPY_VA
		dllCanBeRelocatedAtRunTime, // DYNAMIC_BASE
		codeIntegrityChecksEnforced, // FORCE_INTEGRITY
		isNxCompatible, // NX_COMPAT
		isIsolationAwareButNotIsolated, // NO_ISOLATION
		doNotUseStructuredExceptionHandling, // NO_SEH
		doNotBind, // NO_BIND
		mustExecuteInAppContainer, // APPCONTAINER
		isWindowsDriverModelDriver, // WDM_DRIVER
		supportsControlFlowGuard, // GUARD_CF
		isTerminalServerAware // TERMINAL_SERVER_AWARE
	)
	{
		this.reserved0 = reserved0;
		this.reserved1 = reserved1;
		this.reserved2 = reserved2;
		this.reserved3 = reserved3;
		this.reserved4 = reserved4;
		this.canHandleHighEntropy64BitAddressSpace = canHandleHighEntropy64BitAddressSpace;
		this.dllCanBeRelocatedAtRunTime = dllCanBeRelocatedAtRunTime;
		this.codeIntegrityChecksEnforced = codeIntegrityChecksEnforced;
		this.isNxCompatible = isNxCompatible;
		this.isIsolationAwareButNotIsolated = isIsolationAwareButNotIsolated;
		this.doNotUseStructuredExceptionHandling = doNotUseStructuredExceptionHandling;
		this.doNotBind = doNotBind;
		this.mustExecuteInAppContainer = mustExecuteInAppContainer;
		this.isWindowsDriverModelDriver = isWindowsDriverModelDriver;
		this.supportsControlFlowGuard = supportsControlFlowGuard;
		this.isTerminalServerAware = isTerminalServerAware;
	}

	static fromShort(shortToParse)
	{
		// todo - Are these in reverse order?
		var reserved0 = (shortToParse >> 0) & 1;
		var reserved1 = (shortToParse >> 1) & 1;
		var reserved2 = (shortToParse >> 2) & 1;
		var reserved3 = (shortToParse >> 3) & 1;
		var reserved4 = (shortToParse >> 4) & 1; // Omitted in documentation?
		var canHandleHighEntropy64BitAddressSpace = (shortToParse >> 5) & 1;
		var dllCanBeRelocatedAtRunTime = (shortToParse >> 6) & 1;
		var codeIntegrityChecksEnforced = (shortToParse >> 7) & 1;
		var isNxCompatible = (shortToParse >> 8) & 1;
		var isIsolationAwareButNotIsolated = (shortToParse >> 9) & 1;
		var doNotUseStructuredExceptionHandling = (shortToParse >> 10) & 1;
		var doNotBind = (shortToParse >> 11) & 1;
		var mustExecuteInAppContainer = (shortToParse >> 12) & 1;
		var isWindowsDriverModelDriver = (shortToParse >> 13) & 1;
		var supportsControlFlowGuard = (shortToParse >> 14) & 1;
		var isTerminalServerAware = (shortToParse >> 15) & 1;

		return new DllCharacteristics
		(
			reserved0,
			reserved1,
			reserved2,
			reserved3,
			reserved4,
			canHandleHighEntropy64BitAddressSpace,
			dllCanBeRelocatedAtRunTime,
			codeIntegrityChecksEnforced,
			isNxCompatible,
			isIsolationAwareButNotIsolated,
			doNotUseStructuredExceptionHandling,
			doNotBind,
			mustExecuteInAppContainer,
			isWindowsDriverModelDriver,
			supportsControlFlowGuard,
			isTerminalServerAware 
		);
	}
}
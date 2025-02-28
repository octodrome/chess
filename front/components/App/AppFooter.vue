<template>
    <footer class="p-2 mb-2">
        <div class="text-center text-gray-500 w-full">
            --- {{ $t('credits.start') }}
            <span class="mdi mdi-linkedin"></span>
            <a
                href="https://www.linkedin.com/in/colin-faivre-020498136/"
                target="_blank"
                class="underline font-bold"
                >Colin Faivre</a
            >
            {{ $t('credits.middle') }}
            <span class="mdi mdi-github"></span>
            <a
                href="https://github.com/octodrome/chess"
                target="_blank"
                class="underline font-bold"
                >GitHub</a
            >
            ---
        </div>
    </footer>
</template>

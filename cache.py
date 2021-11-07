import math
import sys

def columnAccessSolver(cache_size, block_size, M, N, type_size, num_iterations=10):
    """
    Solve the column access problem.

    Parameters:
    total_size: the total size of the cache
    block_size: the size of the block
    M: the number of rows
    N: the number of columns

    Returns:
    The number of misses
    """
    num_blocks = cache_size // block_size
    num_blocks_per_array = N // num_data_per_block
    num_arrays = num_blocks // num_blocks_per_array

    if num_data_per_block * num_blocks >= M * N:
        return M * N // num_data_per_block
    if num_data_per_block * num_blocks * 2 <= M * N:
        return num_iterations * M * N

    # partial miss
    overflow = M * N - num_data_per_block * num_blocks
    num_overflow_arrays = math.ceil(overflow / N)

    # num misses during initial access
    initial_misses = 2 * (M + (num_data_per_block - 1) * num_overflow_arrays * 2)
    subsequent_misses = N * num_overflow_arrays * 2

    return int(initial_misses + subsequent_misses * (num_iterations - 1))


def main():
    if len(sys.argv[1:]) != 5:
        print("Enter arguments in order of:  cache_size  block_size  type_size  M  N")
        return 0
    args = [int(num) for num in sys.argv[1:]]
    cache_size = args[0]
    block_size = args[1]
    type_size = args[2]
    M = args[3]
    N = args[4]
    misses = columnAccessSolver(cache_size=cache_size, block_size=block_size, M=M, N=N, type_size=type_size)
    print("The number of misses are: " + str(misses))

    return 0


if __name__ == '__main__':
    main()
